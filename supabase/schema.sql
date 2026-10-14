-- Live visitor and player stats for the portfolio.
-- Paste this whole file into Supabase: SQL Editor -> New query -> Run.
-- It is safe to run more than once.
--
-- Privacy: only a random per-tab id, the page path and a timestamp are stored.
-- No IP address, no cookies, no user agent.
--
-- Security: the three tables are locked (row level security on, no policies),
-- so the public anon key can only call the three functions at the bottom.

create table if not exists live_presence (
  id    uuid primary key,
  page  text not null,
  game  text,
  seen  timestamptz not null default now()
);

create table if not exists live_daily (
  day    date primary key,
  visits int not null default 0,
  plays  int not null default 0
);

create table if not exists live_plays (
  id    bigserial primary key,
  game  text not null,
  kind  text not null check (kind in ('start', 'finish')),
  score int,
  at    timestamptz not null default now()
);

create index if not exists live_presence_seen_idx on live_presence (seen);
create index if not exists live_plays_game_at_idx on live_plays (game, at);

alter table live_presence enable row level security;
alter table live_daily    enable row level security;
alter table live_plays    enable row level security;
revoke all on live_presence, live_daily, live_plays from anon, authenticated;

-- A visitor's tab says "I'm here" every ~20 seconds.
create or replace function live_heartbeat(p_id uuid, p_page text, p_game text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  fresh boolean;
begin
  insert into live_presence (id, page, game, seen)
  values (p_id, left(coalesce(p_page, '/'), 80), nullif(left(coalesce(p_game, ''), 40), ''), now())
  on conflict (id) do update
    set page = excluded.page, game = excluded.game, seen = now()
  returning (xmax = 0) into fresh;

  if fresh then
    insert into live_daily (day, visits) values (current_date, 1)
    on conflict (day) do update set visits = live_daily.visits + 1;
  end if;

  -- housekeeping: drop rows older than a day, now and then
  if random() < 0.02 then
    delete from live_presence where seen < now() - interval '1 day';
  end if;
end;
$$;

-- A game started or finished.
create or replace function live_track(p_game text, p_kind text, p_score int default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_kind not in ('start', 'finish') then
    return;
  end if;

  insert into live_plays (game, kind, score)
  values (left(coalesce(p_game, ''), 40), p_kind, least(greatest(coalesce(p_score, 0), 0), 100000));

  if p_kind = 'start' then
    insert into live_daily (day, plays) values (current_date, 1)
    on conflict (day) do update set plays = live_daily.plays + 1;
  end if;
end;
$$;

-- What the site shows.
create or replace function live_stats()
returns jsonb
language sql
security definer
set search_path = public
stable
as $$
  select jsonb_build_object(
    'online',  (select count(*) from live_presence where seen > now() - interval '50 seconds'),
    'playing', (select count(*) from live_presence where seen > now() - interval '50 seconds' and game is not null),
    'visits',  coalesce((select visits from live_daily where day = current_date), 0),
    'plays',   coalesce((select plays  from live_daily where day = current_date), 0),
    'games',   coalesce((
                 select jsonb_object_agg(game, n)
                 from (select game, count(*) as n from live_plays
                       where kind = 'start' and at >= current_date group by game) g
               ), '{}'::jsonb)
  );
$$;

grant execute on function live_heartbeat(uuid, text, text) to anon;
grant execute on function live_track(text, text, int)      to anon;
grant execute on function live_stats()                     to anon;

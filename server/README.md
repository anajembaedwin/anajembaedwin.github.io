# Tiny Wars server

Keeps the shared weekly war: total glory per side and the top commanders.
Plain Node 18+, no dependencies.

```bash
node tinywars-server.js
# env: PORT=8080  ALLOWED_ORIGINS=https://anajembaedwin.github.io  DATA_FILE=./data.json  TRUST_PROXY=1
```

Then build the site with `REACT_APP_TINYWARS_API=https://your-server` (no trailing slash)
in `.env.local` and run `npm run deploy`. Without it the game runs in practice mode and
scores stay on the player's device.

## Endpoints

- `GET /api/war` this week's totals, top ten, time left, last week's winner
- `POST /api/result` `{ id, name, side, win, draw, glory, seconds, castlePct, kills }`
- `GET /health`

## What it checks (battles run in the browser for now)

- glory is capped (90) and must fit what the stats could earn
- a battle must have lasted at least 20 s; one result per player every 20 s; 40 per IP per hour
- names are cleaned; a player can't change side during a week
- the war resets every Monday 00:00 UTC; each week's winner is kept in history

This stops casual cheating, not a determined one. Live battles, where the match itself runs
on the server, are the real fix.

## Deploy

Any container host works (App Runner, Fly, Railway). Mount `/data` as a volume so scores
survive restarts, set `ALLOWED_ORIGINS`, and put it behind HTTPS. For more than one
instance, swap the JSON file for Postgres or Redis.

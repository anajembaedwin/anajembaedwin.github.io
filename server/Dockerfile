FROM node:20-alpine
WORKDIR /app
COPY tinywars-server.js .
ENV PORT=8080 TRUST_PROXY=1 DATA_FILE=/data/data.json
VOLUME /data
EXPOSE 8080
CMD ["node", "tinywars-server.js"]

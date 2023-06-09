FROM node:18

WORKDIR /app

COPY . .

RUN --mount=type=secret,id=GITHUB_API_URL \
  cat /run/secrets/GITHUB_API_URL

RUN --mount=type=secret,id=GITHUB_USER \
  cat /run/secrets/GITHUB_USER

RUN --mount=type=secret,id=GITHUB_REPO \
  cat /run/secrets/GITHUB_REPO

RUN --mount=type=secret,id=GITHUB_TARGET_REPO \
  cat /run/secrets/GITHUB_TARGET_REPO

RUN --mount=type=secret,id=GITHUB_TOKEN \
  cat /run/secrets/GITHUB_TOKEN

RUN npm i
RUN npm run build

CMD ["npm", "run", "start"]

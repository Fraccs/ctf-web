FROM node:18

WORKDIR /app

COPY . .

ENV GITHUB_API_URL=$GITHUB_API_URL
ENV GITHUB_USER=$GITHUB_USER
ENV GITHUB_REPO=$GITHUB_REPO
ENV GITHUB_TARGET_REPO=$GITHUB_TARGET_REPO
ENV GITHUB_TOKEN=$GITHUB_TOKEN

RUN npm i
RUN npm run build

CMD ["npm", "run", "start"]

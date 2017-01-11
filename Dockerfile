FROM node:7.4-alpine
RUN mkdir /rasa-nlu-data

WORKDIR /rasa-nlu-trainer
COPY . ./

RUN npm i -g rasa-nlu-trainer

EXPOSE 8080

CMD ["rasa-nlu-trainer", "-p", "8080"]

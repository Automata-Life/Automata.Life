FROM python:2.7

ENV PYTHONUNBUFFERED 1
ENV ROOT_DIR="Automata.Life"

RUN mkdir /${ROOT_DIR}
WORKDIR /${ROOT_DIR}

RUN apt-get update
RUN apt-get install -y build-essential fonts-roboto mlocate
ADD requirements.txt /${ROOT_DIR}/
RUN pip install -r requirements.txt

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

ADD . /${ROOT_DIR}/

RUN cd /${ROOT_DIR} && npm install react
RUN cd /${ROOT_DIR} && npm install react-dom
RUN cd /${ROOT_DIR} && npm install webpack
RUN cd /${ROOT_DIR} && npm install webpack-bundle-tracker
RUN cd /${ROOT_DIR} && npm install babel
RUN cd /${ROOT_DIR} && npm install babel-core
RUN cd /${ROOT_DIR} && npm install babel-loader
RUN cd /${ROOT_DIR} && npm install react-tap-event-plugin
RUN cd /${ROOT_DIR} && npm install babel-preset-es2015

RUN apt-get install -y build-essential fonts-roboto nodejs
RUN cd /${ROOT_DIR} && npm install material-ui

FROM python:2.7

ENV PYTHONUNBUFFERED 1
ENV ROOT_DIR="Automata.Life"

RUN mkdir /${ROOT_DIR}

WORKDIR /${ROOT_DIR}

RUN apt-get update
RUN apt-get install -y build-essential fonts-roboto nodejs

ADD requirements.txt /${ROOT_DIR}/
RUN pip install -r requirements.txt

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

ADD . /${ROOT_DIR}/

RUN npm install react react-dom webpack webpack-bundle-tracker \
                babel babel-core babel-loader react-tap-event-plugin \
                babel-preset-es2015 babel-preset-react material-ui

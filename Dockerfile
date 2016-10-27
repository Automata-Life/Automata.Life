FROM python:2.7

ENV PYTHONUNBUFFERED 1
ENV ROOT_DIR="Automata.Life"

RUN mkdir /${ROOT_DIR}
WORKDIR /${ROOT_DIR}

ADD requirements.txt /${ROOT_DIR}/
RUN pip install -r requirements.txt

ADD . /${ROOT_DIR}/

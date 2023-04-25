FROM node:16.14
# FROM ubuntu:22.04
LABEL maintainer="Skytem Surveys Aps"

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -yq apt-utils \
    wget \
    build-essential \
    zlib1g \
    zlib1g-dev \
    libssl-dev \
    libffi-dev \
    libmagic1 \
    openssl \
    sqlite3 \
    libsqlite3-dev \
    libcairo2 \
    nodejs \
    npm \
    unzip

RUN useradd -m -s $(which bash) skytemdev && mkdir -p /app && chown skytemdev:skytemdev /app && echo "export PS1='\$(whoami)@ [\$(pwd)]# '" >> /etc/bashrc
ENV PATH="${PATH}:/home/skytemdev/.local/bin"

WORKDIR /app/frontend
RUN yarn install --frozen-lockfile

WORKDIR /tmp
RUN wget https://www.python.org/ftp/python/3.10.7/Python-3.10.7.tgz
RUN tar xzf Python-3.10.7.tgz
WORKDIR /tmp/Python-3.10.7
RUN ./configure --enable-optimizations
RUN make altinstall
WORKDIR /tmp
RUN rm -rf Python-3.10.7
RUN rm Python-3.10.7.tgz

RUN update-alternatives --install /usr/bin/python python /usr/local/bin/python3.10 10

RUN apt-get update \
    && apt-get remove -y wget \
    unzip

RUN apt-get autoremove -y && apt-get clean -y

ENV TERM xterm-256color
# USER skytemdev
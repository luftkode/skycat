#!/bin/bash

# Install poetry
python -m pip install poetry

# Backend
DEV_DOCAT_PATH="$(mktemp -d)"
poetry install
DOCAT_SERVE_FILES=1 DOCAT_STORAGE_PATH="$DEV_DOCAT_PATH" poetry run python -m docat &

# Frontend
cd  ../frontend
yarn install --pure-lockfile
yarn start
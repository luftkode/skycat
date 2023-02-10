#! /bin/bash
# Run this script with source create_venv.sh

python -m venv .venv

source .venv/bin/activate

poetry install
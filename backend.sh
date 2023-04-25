# Jf. "Local development" her: https://github.com/docat-org/docat

# Actiavte venv
source .venv/bin/activate

DEV_DOCAT_PATH="$(mktemp -d)"

# install dependencies
#poetry install

# run the local development version
DOCAT_SERVE_FILES=1 DOCAT_STORAGE_PATH="$DEV_DOCAT_PATH" poetry run python -m docat
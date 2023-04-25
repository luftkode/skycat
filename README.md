# Skydoc

(a fork of docat)
For version control of Sphinx-generated documentation at SkyTEM.

## Running Skydoc *production* container

Until we get an image hosted, you must build and run it locally:

* Go to repo root folder

* `docker build . -t skydoc`

* ```
  docker run \
    --detach \
    --volume $PWD/docat-run/doc:/var/docat/ \
    --publish 8000:80 \
    skydoc:latest
  ```
## Running Skydoc *development* container
Go to the repo root folder on your host and run the following commands:
```
docker compose -f docker/docker-compose.yml build
docker compose -f docker/docker-compose.yml run docat-dev
```

This will bring up a container in which both back- and frontend are running.
In the terminal will be the IP and port you can connect to. Conencting to this will give you instant feedback when you are messing around with the frontend files.
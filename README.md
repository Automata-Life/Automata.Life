[![Build Status](https://travis-ci.org/Automata-Life/Automata.Life.svg?branch=master)](https://travis-ci.org/Automata-Life/Automata.Life)
### Automata.Life

This repository contains our main application. It consists in a Django server
(`automata_life_server`) and a Django app (`automata_life`). The Django app is
implemented using React.js and its [MaterialUI](http://www.material-ui.com)
component.

The dependencies to build the project are
[Docker](https://www.docker.com/products/overview) and
[docker-compose](https://docs.docker.com/compose/install/).

We provide a startup script called `manage.sh`. To see all options,
run `./manage.sh help`:

```
$ ./manage.sh help
usage:                   ./manage.sh [OPTIONS]:

 build:                  Build everything, images and containers
 run:                    Run the app on the latest container
 stop:                   Stop all containers
 all:                    Run full build

 test:                   Run unit tests
 harvest:                Run acceptance tests

 webpack:                Runs webpack

 ps:                     Show all Docker containers
 images:                 Show all Docker images
 clean:                  Stop and remove all containers
 purge:                  Delete all Docker images

 bash [web|db]:          Get a shell in [web|db]
 command [web|db] [CMD]: Run [CMD] in [web|db]

 help:                   Print this message
```

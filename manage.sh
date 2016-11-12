#! /bin/bash
#
# Builds a docker image using docker-compose
# Thinly wraps manage.py
# Requires docker and docker-compose to run
#

set -e

function usage {
    echo "usage:                   $0 [OPTIONS]:"
    echo ""
    echo " build:                  Build everything, images and containers"
    echo " run:                    Run the app on the latest container"
    echo " stop:                   Stop all containers"
    echo " all:                    Run full build"
    echo ""
    echo " test:                   Run unit tests"
    echo " harvest:                Run acceptance tests"
    echo ""
    echo " webpack:                Runs webpack"
    echo ""
    echo " ps:                     Show all Docker containers"
    echo " images:                 Show all Docker images"
    echo " clean:                  Stop and remove all containers"
    echo " purge:                  Delete all Docker images"
    echo ""
    echo " bash [web|db]:          Get a shell in [web|db]"
    echo " command [web|db] [CMD]: Run [CMD] in [web|db]"
    echo ""
    echo " help:                   Print this message"
    echo ""
}

function check_deps {
    # Check dependencies.
    command -v docker > /dev/null 2>&1 || { echo >&2 "I require '${DOCKER}', but it's not installed.  Aborting."; exit 1; }
    command -v docker-compose > /dev/null 2>&1 || { echo >&2 "I require '${DOCKER_COMPOSE}', but it's not installed.  Aborting."; exit 1; }
    return 0
}

function build {
    echo "> Starting docker-compose build..."
    docker-compose build
    echo "> Done."
}

function run {
    echo "Starting server..."
    docker-compose up
}

function stop {
    echo "> Stopping all containers..."
    CONTAINERS=$(docker ps -a -q)
    if [[ -n $CONTAINERS ]]
    then
        docker stop $CONTAINERS
    fi
    echo "> Done."
}

function all {
    echo "> Starting full build..."
    build
    clean
    echo "> Done."
}

function test {
    echo "> Running unit tests..."
    docker-compose run web python manage.py test
    echo "> Done."
}

function harvest {
    echo "> Running acceptance tests..."
    docker-compose run web python manage.py harvest
    echo "> Done."
}

function webpack {
    echo "> Running webpack..."
    docker-compose run web ./node_modules/.bin/webpack --config webpack.config.js
    echo "> Done."
}

function ps {
    echo "> List of all Docker containers:"
    docker ps -a
}

function images {
    echo "> List of all Docker images:"
    docker images -a
}

function clean {
    echo "> Stopping and removing all containers..."
    CONTAINERS=$(docker ps -aq)
    if [[ -n $CONTAINERS ]]
    then
        docker stop $CONTAINERS
        docker rm -f $CONTAINERS
    fi
    echo "> Done."
}

function purge {
    echo "> Removing all Docker images..."
    IMAGES=$(docker images -aq)
    if [[ -n $IMAGES ]]
    then
        docker rmi -f $IMAGES
    fi
    echo "> Done."
}

function command {
    echo "> Running command on $1..."
    docker-compose run $1 $2
    echo "> Done."
}

function bash {
    echo "> Getting a shell on $1..."
    docker-compose run $1 /bin/bash
    echo "> Done."
}

if check_deps; then
    if [[ $1 == build ]]     ; then build;
    elif [[ $1 == run ]]     ; then run;
    elif [[ $1 == stop ]]    ; then stop;
    elif [[ $1 == all ]]     ; then all;
    elif [[ $1 == test ]]    ; then test;
    elif [[ $1 == harvest ]] ; then harvest;
    elif [[ $1 == webpack ]] ; then webpack;
    elif [[ $1 == ps ]]      ; then ps;
    elif [[ $1 == images ]]  ; then images;
    elif [[ $1 == clean ]]   ; then clean;
    elif [[ $1 == purge ]]   ; then purge;
    elif [[ $1 == bash ]]    ; then bash $2;
    elif [[ $1 == command ]] ; then command $2 "$3";
    elif [[ $1 == help ]]    ; then usage;
    else { echo ""           ; echo "Error: no valid argument"; echo ""; usage; exit 1; }
    fi
fi

#! /bin/bash

TRAVIS_DB=$(cat .travis_settings/travis_database.txt)

SETTINGS_FILE=automata_life_server/settings.py

sed -zi "s/DATABASES[^}]*./$TRAVIS_DB/g" "$SETTINGS_FILE"

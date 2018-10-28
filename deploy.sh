#!/usr/bin/env bash

cd js || exit

yarn build

cd ../server || exit

gcloud app deploy

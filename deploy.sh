#!/usr/bin/env bash

cd js || exit

yarn build

cd ..

gcloud app deploy dispatch.yaml --quiet

cd server || exit

gcloud app deploy --quiet

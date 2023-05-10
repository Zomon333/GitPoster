#!/bin/bash
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

nvm use 19
node ./gitposter.js&
sleep 2
clear

@echo off
cd /d "./"
start cmd /k "npm start"
cd /d "./backend"
start cmd /k "node server.js"
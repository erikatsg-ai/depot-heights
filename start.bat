@echo off
title Astro Preview Server
echo ====================================================
echo   Building and starting the Astro preview server...
echo ====================================================
echo.

:: Build the static site so Pagefind assets are generated
call npm run build

:: Start the preview server in background
echo Starting preview server on port 4321...
start /B npx astro preview --host 127.0.0.1 --port 4321

:: Wait for the server to be ready
echo Waiting for server to start...
timeout /t 3 /nobreak >nul

:: Open the preview site in the browser
start "" http://127.0.0.1:4321/

echo Server is running at http://127.0.0.1:4321/
echo Press Ctrl+C to stop.
echo.

:: Keep terminal open
pause

@echo off
TITLE Astro to Vercel Deployment Automation
COLOR 0A

echo ===================================================
echo   Astro Project Deployment to Vercel
echo ===================================================
echo.

:: Step 1: Clean previous build artifacts & caches
echo [1/5] Cleaning local build caches...
if exist "dist" rmdir /s /q "dist"
if exist ".astro" rmdir /s /q ".astro"
echo Local cache cleared.
echo.

:: Step 2: Test local build
echo [2/5] Testing production build locally (npm run build)...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    COLOR 0C
    echo.
    echo ===================================================
    echo  ERROR: Local build failed! 
    echo  Deployment aborted to prevent breaking production.
    echo ===================================================
    pause
    exit /b %ERRORLEVEL%
)
echo Local build succeeded!
echo.

:: Step 3: Run Local Preview Server & Link Audit
echo [3/5] Starting background preview server for link audit...
start /B npx astro preview --host 127.0.0.1 --port 4321

echo Waiting for preview server to initialize on http://127.0.0.1:4321...
:: Reliable 6-second delay in Windows Batch
ping 127.0.0.1 -n 9 > nul

echo Scanning all internal links with Linkinator...
echo.
call npx linkinator http://127.0.0.1:4321 --recurse --skip "^(?!http://127\.0\.0\.1:4321)" --verbosity error
set LINK_ERR=%ERRORLEVEL%

:: Shut down the background preview server process on port 4321
echo Stopping local preview server...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":4321" ^| findstr "LISTENING"') do taskkill /PID %%a /F > nul 2>&1

if %LINK_ERR% NEQ 0 (
    COLOR 0C
    echo.
    echo ===================================================
    echo  ERROR: Broken internal links detected!
    echo  Fix the broken routes above before deploying.
    echo  Deployment aborted.
    echo ===================================================
    pause
    exit /b %LINK_ERR%
)

echo.
echo SUCCESS: 0 broken links found! Proceeding with deployment.
echo.

:: Step 4: Choose Deployment Method
echo [4/5] Ready to upload to Vercel.
echo.
echo Choose deployment method:
echo   [1] Git Push (Recommended - triggers Vercel GitHub integration)
echo   [2] Vercel CLI Direct Push (Requires 'vercel' CLI installed)
echo.
set /p choice="Enter option (1 or 2): "

if "%choice%"=="1" goto GIT_DEPLOY
if "%choice%"=="2" goto CLI_DEPLOY

echo Invalid selection. Defaulting to Git Push...
goto GIT_DEPLOY

:GIT_DEPLOY
echo.
echo [5/5] Uploading via Git...
set /p commit_msg="Enter Git commit message (e.g. Update header navigation): "
if "%commit_msg%"=="" set commit_msg="Update Astro site build"

call git add .
call git commit -m "%commit_msg%"
call git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo  SUCCESS: Code pushed to GitHub! 
    echo  Vercel is now building your updated site live.
    echo ===================================================
) else (
    COLOR 0C
    echo.
    echo ERROR: Git push failed. Check your network or repository access.
)
goto END

:CLI_DEPLOY
echo.
echo [5/5] Uploading via Vercel CLI...
call vercel --prod

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo  SUCCESS: Directly deployed to Vercel Production!
    echo ===================================================
) else (
    COLOR 0C
    echo.
    echo ERROR: Vercel CLI deployment failed. Ensure you are logged in ('vercel login').
)
goto END

:END
echo.
pause
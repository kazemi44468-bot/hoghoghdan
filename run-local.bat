@echo off
chcp 65001 >nul
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://127.0.0.1:8765/pages/portal.html
  py -3 server.py
) else (
  where python >nul 2>nul
  if errorlevel 1 (
    echo Python 3 is not installed. Install Python 3 and run this file again.
    pause
    exit /b 1
  )
  start "" http://127.0.0.1:8765/pages/portal.html
  python server.py
)
pause

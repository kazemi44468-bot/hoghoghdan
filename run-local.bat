@echo off
chcp 65001 >nul
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 server.py
) else (
  where python >nul 2>nul
  if errorlevel 1 (
    echo Python 3 is not installed. Install Python 3 and run this file again.
    pause
    exit /b 1
  )
  python server.py
)
pause

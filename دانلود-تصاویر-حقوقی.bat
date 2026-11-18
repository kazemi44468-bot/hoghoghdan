@echo off
chcp 65001 >nul
cd /d "%~dp0"
python scripts\download_legal_images.py
echo.
pause

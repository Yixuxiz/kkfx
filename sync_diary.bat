@echo off
chcp 65001 >nul
echo ============================================
echo     Obsidian 日记同步脚本
echo ============================================
echo.
"C:\Users\DK\AppData\Local\Microsoft\WindowsApps\python.exe" "%~dp0sync_diary.py"
echo.
echo 按任意键退出...
pause >nul
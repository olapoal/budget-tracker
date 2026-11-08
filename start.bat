@echo off
title Budget Tracker Pro - Local Server
cd /d "%~dp0"
echo ========================================================
echo  💰 BUDGET TRACKER PRO - BUKA APLIKASI
echo ========================================================
echo Membuka aplikasi di browser...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause

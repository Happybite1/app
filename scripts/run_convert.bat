@echo off
cd /d %~dp0\..
.venv\Scripts\python.exe scripts\convert_images.py

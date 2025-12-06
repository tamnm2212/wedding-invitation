@echo off
setlocal enabledelayedexpansion

REM Xử lý file .jpg
for %%f in (*.jpg) do (
    set "name=%%~nf"
    echo Đổi tên: %%f → !name!.png
    ren "%%f" "!name!.png"
)

REM Xử lý file .JPG
for %%f in (*.JPG) do (
    set "name=%%~nf"
    echo Đổi tên: %%f → !name!.png
    ren "%%f" "!name!.png"
)

echo Hoàn tất!
pause

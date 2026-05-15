@echo off
echo ============================================
echo  Liberte Construction Of Afrika - Setup
echo ============================================

echo.
echo [1/3] Copie du logo dans public/...
if not exist "public" mkdir public
copy "..\logo.jpeg" "public\logo.jpeg" >nul 2>&1
if exist "public\logo.jpeg" (
    echo     Logo copie avec succes.
) else (
    echo     ATTENTION: Copiez manuellement logo.jpeg dans public/
)

echo.
echo [2/3] Installation des dependances npm...
call npm install

echo.
echo [3/3] Lancement du serveur de developpement...
echo     Le site sera accessible sur http://localhost:5173
echo.
call npm run dev
pause

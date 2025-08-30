# Script para configurar Git e fazer push inicial
Write-Host "Configurando Git para o projeto..." -ForegroundColor Green

# Adicionar Git ao PATH temporariamente
$env:PATH += ";C:\Program Files\Git\bin"

# Verificar se Git está funcionando
try {
    $gitVersion = & "C:\Program Files\Git\bin\git.exe" --version
    Write-Host "Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Erro ao executar Git" -ForegroundColor Red
    exit 1
}

# Configurar Git
Write-Host "Configurando Git..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" config --global user.name "joaussgbriel"
& "C:\Program Files\Git\bin\git.exe" config --global user.email "joaussgbriel@github.com"

# Inicializar repositório
Write-Host "Inicializando repositório Git..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" init

# Adicionar arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" add .

# Commit inicial
Write-Host "Fazendo commit inicial..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" commit -m "Commit inicial: Proposta Comercial Ana Paula"

# Adicionar repositório remoto
Write-Host "Conectando ao GitHub..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/joaussgbriel/proposta-ana-paula-.git

# Fazer push
Write-Host "Fazendo push para GitHub..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" branch -M main
& "C:\Program Files\Git\bin\git.exe" push -u origin main

Write-Host "Projeto configurado e enviado para GitHub!" -ForegroundColor Green
Write-Host "Acesse: https://github.com/joaussgbriel/proposta-ana-paula-" -ForegroundColor Cyan
Write-Host "Agora você pode fazer deploy no Vercel!" -ForegroundColor Cyan

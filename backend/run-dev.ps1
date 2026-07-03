# Loads backend\.env into the current process and starts the Spring Boot API.
# Usage:  .\run-dev.ps1
$ErrorActionPreference = 'Stop'
$envFile = Join-Path $PSScriptRoot '.env'
if (-not (Test-Path $envFile)) {
    Write-Error "No .env found. Copy .env.example to .env and fill in your values."
    exit 1
}
Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith('#') -and $line.Contains('=')) {
        $idx = $line.IndexOf('=')
        $key = $line.Substring(0, $idx).Trim()
        $val = $line.Substring($idx + 1).Trim()
        Set-Item -Path "Env:$key" -Value $val
    }
}
if ($env:DB_PASSWORD -eq '[YOUR-PASSWORD]') {
    Write-Error "DB_PASSWORD is still the placeholder. Edit backend\.env and set your Supabase password."
    exit 1
}
Write-Host "Starting Top-Line API on http://localhost:8080  (DB host: $env:DB_HOST)" -ForegroundColor Green
& (Join-Path $PSScriptRoot 'mvnw.cmd') spring-boot:run

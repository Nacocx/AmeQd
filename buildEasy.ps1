# 执行 npm run build
Write-Host "正在执行 npm run build..." -ForegroundColor Cyan
npm run build

# 检查 ./dist/static/static2 是否存在
$sourcePath = "./dist/static/static2"
$destPath = "./dist/static2"

if (Test-Path $sourcePath) {
    # 创建目标目录（如果不存在）
    if (-not (Test-Path $destPath)) {
        New-Item -ItemType Directory -Path $destPath | Out-Null
    }

    # 移动所有文件
    Write-Host "正在移动文件从 $sourcePath 到 $destPath..." -ForegroundColor Cyan
    Get-ChildItem -Path $sourcePath | Move-Item -Destination $destPath -Force

    # 检查 static 文件夹是否为空
    $staticFolder = "./dist/static"
    if ((Test-Path $staticFolder) -and ((Get-ChildItem $staticFolder -Recurse | Measure-Object).Count -eq 0)) {
        Write-Host "static 文件夹为空，正在删除..." -ForegroundColor Yellow
        Remove-Item $staticFolder -Recurse -Force
    }
} else {
    Write-Host "警告：$sourcePath 不存在，跳过文件移动" -ForegroundColor Yellow
}

# 显示目录结构
Write-Host "`n./dist 目录结构：" -ForegroundColor Green
tree ./dist
# tree /F ./dist

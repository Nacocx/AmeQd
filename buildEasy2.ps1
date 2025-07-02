<#
.SYNOPSIS
  将 bash 构建脚本转换为 PowerShell 脚本
.DESCRIPTION
  该脚本执行以下操作：
  1. 检查必要文件 (data.txt 和 .env.production)
  2. 处理多组配置
  3. 为每组配置执行构建
  4. 处理构建输出文件
.NOTES
  使用相对路径 ./build-dist 作为输出目录
#>

# 检查必要文件
if (-not (Test-Path "data.txt")) {
    Write-Host "错误：data.txt文件不存在" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path ".env.production")) {
    Write-Host "错误：.env.production文件不存在" -ForegroundColor Red
    exit 1
}

# 目标目录改为相对路径
$target_dir = Join-Path -Path $PWD -ChildPath "build-dist"

# 创建目标目录（如果不存在）
if (-not (Test-Path $target_dir)) {
    New-Item -ItemType Directory -Path $target_dir -Force | Out-Null
}

# 备份原始.env.production
Copy-Item ".env.production" ".env.production.bak" -Force

# 读取并显示 data.txt 内容
$dataContent = Get-Content "data.txt" -Raw
$groups = $dataContent -split "`r`n`r`n|`n`n" | Where-Object { $_.Trim() -ne "" }

# 显示分组
for ($i = 0; $i -lt $groups.Count; $i++) {
    Write-Host "$($i+1): $($groups[$i])`n" -ForegroundColor Cyan
}

$total_groups = $groups.Count
Write-Host "共找到 $total_groups 组配置" -ForegroundColor Cyan

# 处理每组数据
for ($group = 0; $group -lt $total_groups; $group++) {
    $groupNumber = $group + 1
    Write-Host "`n===== 正在处理第 $groupNumber 组配置 =====" -ForegroundColor Blue

    # 获取当前组
    $current_group = $groups[$group]

    # 检查是否获取到有效数据
    if ([string]::IsNullOrWhiteSpace($current_group)) {
        Write-Host "警告：第 $groupNumber 组数据为空，跳过" -ForegroundColor Yellow
        continue
    }

    # 从VITE_JSON_BASE_PATH中提取文件名
    $fileName = $current_group -split "`n" | Where-Object { $_ -match 'VITE_JSON_BASE_PATH' }
    if ($fileName) {
        $fileName = $fileName -split '/' | Select-Object -Last 1
    }

    if ([string]::IsNullOrWhiteSpace($fileName)) {
        Write-Host "警告：无法从配置中提取文件名，使用默认index.html" -ForegroundColor Yellow
        $fileName = "index"
    }

    # 更新.env.production
    Write-Host "更新.env.production文件..." -ForegroundColor Cyan

    # 读取原始文件内容
    $originalContent = Get-Content ".env.production.bak" -Raw

    # 处理内容
    $newContent = ""

    # 保留注释
    $newContent += ($originalContent -split "`n" | Where-Object { $_ -match '^#' }) -join "`n"
    $newContent += "`n$current_group`n"

    # 保留其他非目标配置
    $newContent += ($originalContent -split "`n" | Where-Object {
        $_ -notmatch '^#' -and $_ -notmatch 'VITE_RES_BASE_PATH' -and $_ -notmatch 'VITE_JSON_BASE_PATH' -and $_ -notmatch 'VITE_JC_BASE_PATH'
    }) -join "`n"

    # 写入新文件
    $newContent | Out-File ".env.production" -Encoding utf8 -Force

    # 执行构建
    Write-Host "执行 npm run build..." -ForegroundColor Cyan
    npm run build

    # 处理dist目录
    if (Test-Path "./dist") {
        # 重命名index.html
        if (Test-Path "./dist/index.html") {
            $new_name = "$fileName.html"
            Write-Host "将index.html重命名为 $new_name..." -ForegroundColor Cyan
            Move-Item "./dist/index.html" "./dist/$new_name" -Force
        } else {
            Write-Host "警告：dist/index.html 不存在" -ForegroundColor Yellow
        }

        # 处理static/static2合并
        if (Test-Path "./dist/static/static2") {
            Write-Host "合并static/static2到static2目录..." -ForegroundColor Cyan

            # 创建目标目录
            if (-not (Test-Path "./dist/static2")) {
                New-Item -ItemType Directory -Path "./dist/static2" -Force | Out-Null
            }

            # 复制文件
            Copy-Item -Path "./dist/static/static2/*" -Destination "./dist/static2/" -Recurse -Force

            # 删除源目录
            Remove-Item "./dist/static/static2" -Recurse -Force

            # 检查static目录是否为空
            if ((Get-ChildItem "./dist/static" | Measure-Object).Count -eq 0) {
                Write-Host "删除空static目录..." -ForegroundColor Cyan
                Remove-Item "./dist/static" -Recurse -Force
            }
        }

        # 移动整个dist到目标目录
        Write-Host "移动dist到目标目录..." -ForegroundColor Cyan

        # 确保目标目录存在
        if (-not (Test-Path $target_dir)) {
            New-Item -ItemType Directory -Path $target_dir -Force | Out-Null
        }

        # 复制所有文件到目标目录
        Copy-Item -Path "./dist/*" -Destination $target_dir -Recurse -Force

        # 删除临时dist目录
        Remove-Item "./dist" -Recurse -Force
    } else {
        Write-Host "警告：dist目录不存在，跳过移动" -ForegroundColor Yellow
    }

    Write-Host "第 $groupNumber 组处理完成" -ForegroundColor Green
}

# 恢复原始.env.production
Move-Item ".env.production.bak" ".env.production" -Force
Write-Host "已恢复原始.env.production文件" -ForegroundColor Cyan

# 显示最终目录结构
Write-Host "`n$target_dir 最终目录结构：" -ForegroundColor Green
if (Get-Command "tree.com" -ErrorAction SilentlyContinue) {
    tree.com $target_dir
} else {
    Get-ChildItem $target_dir -Recurse | Format-Table Name, FullName
}
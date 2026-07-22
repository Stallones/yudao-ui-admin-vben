# 从 dev 合并更新到 sta/blog-admin，自动保持已删模块的删除状态
# 用法: powershell -File scripts/merge-from-dev.ps1

# 已删除的 app 变体（只保留 web-antd）
$DELETED_APPS = @(
    "apps/web-antdv-next",
    "apps/web-ele",
    "apps/web-naive",
    "apps/web-tdesign"
)

# 已删除的 views 业务模块（保留 _core, blog, system, infra）
$DELETED_VIEWS = @(
    "apps/web-antd/src/views/ai",
    "apps/web-antd/src/views/bpm",
    "apps/web-antd/src/views/crm",
    "apps/web-antd/src/views/erp",
    "apps/web-antd/src/views/im",
    "apps/web-antd/src/views/iot",
    "apps/web-antd/src/views/mall",
    "apps/web-antd/src/views/member",
    "apps/web-antd/src/views/mes",
    "apps/web-antd/src/views/mp",
    "apps/web-antd/src/views/pay",
    "apps/web-antd/src/views/report",
    "apps/web-antd/src/views/wms"
)

# 已删除的 router modules（保留 blog, dashboard, system, infra）
$DELETED_ROUTES = @(
    "apps/web-antd/src/router/routes/modules/ai.ts",
    "apps/web-antd/src/router/routes/modules/bpm.ts",
    "apps/web-antd/src/router/routes/modules/crm.ts",
    "apps/web-antd/src/router/routes/modules/im.ts",
    "apps/web-antd/src/router/routes/modules/iot.ts",
    "apps/web-antd/src/router/routes/modules/leave.ts",
    "apps/web-antd/src/router/routes/modules/mall.ts",
    "apps/web-antd/src/router/routes/modules/member.ts",
    "apps/web-antd/src/router/routes/modules/mes.ts",
    "apps/web-antd/src/router/routes/modules/pay.ts"
)

# 已删除的 api 业务模块（保留 blog, core, infra, system）
$DELETED_APIS = @(
    "apps/web-antd/src/api/ai",
    "apps/web-antd/src/api/bpm",
    "apps/web-antd/src/api/crm",
    "apps/web-antd/src/api/erp",
    "apps/web-antd/src/api/im",
    "apps/web-antd/src/api/iot",
    "apps/web-antd/src/api/mall",
    "apps/web-antd/src/api/member",
    "apps/web-antd/src/api/mes",
    "apps/web-antd/src/api/mp",
    "apps/web-antd/src/api/pay",
    "apps/web-antd/src/api/wms"
)

# 已删除的 store
$DELETED_STORES = @(
    "apps/web-antd/src/store/mall"
)

$ALL_DELETED = $DELETED_APPS + $DELETED_VIEWS + $DELETED_ROUTES + $DELETED_APIS + $DELETED_STORES

Write-Host "Merging dev..." -ForegroundColor Cyan
git merge dev

if ($LASTEXITCODE -ne 0) {
    Write-Host "Handling modify/delete conflicts (keep deletions)..." -ForegroundColor Yellow
    $status = git status --porcelain
    foreach ($line in $status) {
        if ($line -match "^(DU|AU|UD) ") {
            $file = $line.Substring(3).Trim()
            Write-Host "  Keeping deletion: $file" -ForegroundColor Yellow
            git rm "`"$file`"" 2>$null
        }
    }
}

# 清理被带回来的已删目录/文件
Write-Host "Cleaning up deleted modules..." -ForegroundColor Cyan
foreach ($path in $ALL_DELETED) {
    if (Test-Path $path) {
        Write-Host "  Removing: $path" -ForegroundColor Yellow
        git rm -r --ignore-unmatch $path
        Remove-Item -Recurse -Force $path -ErrorAction SilentlyContinue
    }
}

# 检查是否还有未解决的内容冲突
$remaining = git status --porcelain | Select-String "^(DD|AU|UD|UA|DU|AA|U)"
if ($remaining) {
    Write-Host "`nUnresolved content conflicts (fix manually):" -ForegroundColor Red
    git diff --name-only --diff-filter=U
    exit 1
}

git commit --no-edit
Write-Host "`nMerge complete." -ForegroundColor Green

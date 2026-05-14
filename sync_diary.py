#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Obsidian 日记同步脚本
将 D:\Dk\文档\DD\Diary 中的日记同步到 GitHub 仓库的 content/posts 目录
"""

import os
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# ==================== 配置项 ====================
# Obsidian 日记文件夹路径
OBSIDIAN_DIARY_DIR = r"D:\Dk\文档\DD\Diary"

# GitHub 仓库本地路径（会自动克隆到这个位置）
LOCAL_REPO_DIR = r"D:\Dk\blogdemo\kkblog"

# 目标文件夹（仓库中的相对路径）
TARGET_DIR = "content/posts"

# GitHub 仓库 URL
GITHUB_REPO_URL = "https://github.com/Yixuxiz/kkfx.git"

# ================================================

def log(message, level="info"):
    """打印日志"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    prefix = {
        "info": "[INFO]",
        "success": "[SUCCESS]",
        "warning": "[WARNING]",
        "error": "[ERROR]"
    }.get(level, "[INFO]")
    print(f"{timestamp} {prefix} {message}")

def run_command(cmd, cwd=None):
    """执行命令并返回结果"""
    try:
        log(f"执行命令: {' '.join(cmd)}")
        result = subprocess.run(
            cmd,
            cwd=cwd,
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        if result.returncode != 0:
            log(f"命令执行失败: {result.stderr}", "error")
            return False, result.stderr
        log(f"命令执行成功: {result.stdout.strip()}" if result.stdout else "命令执行成功")
        return True, result.stdout
    except Exception as e:
        log(f"命令执行异常: {e}", "error")
        return False, str(e)

def sync_diary():
    log("开始同步 Obsidian 日记到 GitHub...")
    
    # 1. 检查本地仓库是否存在
    repo_path = Path(LOCAL_REPO_DIR)
    if not repo_path.exists():
        log(f"本地仓库不存在，正在克隆到: {LOCAL_REPO_DIR}", "info")
        success, _ = run_command(["git", "clone", GITHUB_REPO_URL, str(repo_path)])
        if not success:
            log("仓库克隆失败", "error")
            return
    
    # 2. 检查日记文件夹是否存在
    diary_path = Path(OBSIDIAN_DIARY_DIR)
    if not diary_path.exists():
        log(f"日记文件夹不存在: {OBSIDIAN_DIARY_DIR}", "error")
        return
    log(f"日记文件夹路径: {OBSIDIAN_DIARY_DIR}")
    
    # 3. 更新本地仓库
    log("更新本地仓库...")
    success, _ = run_command(["git", "pull", "origin", "main"], cwd=str(repo_path))
    if not success:
        log("仓库更新失败，继续执行...", "warning")
    
    # 4. 确保目标目录存在
    target_path = repo_path / TARGET_DIR
    target_path.mkdir(parents=True, exist_ok=True)
    log(f"目标目录: {target_path}")
    
    # 5. 获取日记文件列表
    diary_files = list(diary_path.glob("*.md"))
    if not diary_files:
        log("没有找到日记文件", "warning")
        return
    
    log(f"找到 {len(diary_files)} 个日记文件")
    
    # 6. 复制日记文件到目标目录
    updated_count = 0
    for md_file in diary_files:
        # 构建目标路径（保留原文件名）
        target_file = target_path / md_file.name
        
        # 检查文件是否需要更新
        if target_file.exists():
            src_mtime = md_file.stat().st_mtime
            dst_mtime = target_file.stat().st_mtime
            if src_mtime <= dst_mtime:
                log(f"跳过未修改的文件: {md_file.name}")
                continue
        
        # 复制文件
        try:
            shutil.copy2(md_file, target_file)
            log(f"复制成功: {md_file.name}")
            updated_count += 1
        except Exception as e:
            log(f"复制失败 {md_file.name}: {e}", "error")
    
    if updated_count == 0:
        log("没有需要更新的文件")
        return
    
    # 7. 检查是否有变更
    log("检查仓库变更...")
    success, output = run_command(["git", "status", "--porcelain"], cwd=str(repo_path))
    if not success:
        log("检查变更失败", "error")
        return
    
    if not output.strip():
        log("仓库没有变更，无需提交")
        return
    
    # 8. Git 操作
    log("提交变更...")
    
    # 添加文件
    success, _ = run_command(["git", "add", TARGET_DIR], cwd=str(repo_path))
    if not success:
        return
    
    # 提交
    commit_msg = f"Update diary: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    success, _ = run_command(["git", "commit", "-m", commit_msg], cwd=str(repo_path))
    if not success:
        return
    
    # 推送
    log("推送到远程仓库...")
    success, _ = run_command(["git", "push", "origin", "main"], cwd=str(repo_path))
    if not success:
        return
    
    log("同步完成！日记已成功推送到 GitHub 仓库", "success")
    log(f"仓库地址: {GITHUB_REPO_URL}", "success")

if __name__ == "__main__":
    try:
        sync_diary()
    except KeyboardInterrupt:
        log("用户中断操作", "warning")
        sys.exit(0)
    except Exception as e:
        log(f"程序异常终止: {e}", "error")
        sys.exit(1)

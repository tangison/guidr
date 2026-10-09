# Disk full or above 85 percent

1. `disk_usage` on `/`, the Docker data directory, logs, uploads, backups.
2. Safe clean-ups (Tier 1): `logs_rotate`, `docker_prune_safe` (dangling images and stopped containers only).
3. If backups are filling the disk: confirm offsite copies exist, then ask the owner to approve removing the oldest local copies (Tier 2).
4. If database or uploads are growing abnormally: escalate; check for runaway logs, a failing job writing files, or abuse of upload endpoints.
5. Never delete volumes or database files. Never run a blanket "rm" command.
6. Recommend resizing the volume or server if growth is organic; Tier 2.
7. Add an alert at 80 percent if missing.

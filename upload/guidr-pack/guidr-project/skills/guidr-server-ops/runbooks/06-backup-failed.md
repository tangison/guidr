# Backup failed or missing

1. `backup_status`: which step failed (dump, upload, offsite copy)?
2. `logs_tail` the backup job. Common causes: disk full, credentials expired, offsite endpoint unreachable.
3. Fix the cause if safe (Tier 1 `backup_run` after resolving disk or network issues). If credentials are the cause: Tier 2.
4. Run `backup_run` and confirm size and offsite copy.
5. If two consecutive backups have failed, treat as high priority and notify the owner even if the system is otherwise healthy.
6. Schedule a restore test to confirm the latest backup is usable.

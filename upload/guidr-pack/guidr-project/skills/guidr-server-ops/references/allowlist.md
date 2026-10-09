# Allowlist (tool functions the ops agent may call)

All calls validate arguments against fixed lists of service names. No free-form shell.

## Tier 0: observe
| Function | Arguments | Notes |
|---|---|---|
| `http_check` | url (from list) | status code, time, SSL expiry |
| `service_status` | service | running, restarts, uptime, health |
| `logs_tail` | service, lines (max 500), since | Redacts secrets and emails before returning |
| `host_metrics` | none | CPU, memory, load, disk, inode use |
| `disk_usage` | path (from list) | Top directories by size |
| `db_health` | none | Connections, slow query count, replication or WAL status, size |
| `queue_depth` | queue | Waiting, active, failed |
| `backup_status` | none | Last run, size, offsite copy, age |
| `deploy_history` | service | Last 10 releases with commit ids |
| `cert_expiry` | domain | Days remaining |
| `error_summary` | window | Top errors from the tracker |

## Tier 1: safe fix (rate limited, logged)
| Function | Arguments | Limit |
|---|---|---|
| `container_restart` | service (app, worker, redis, proxy) | 3 per hour per service |
| `job_retry` | queue, job id | 20 per hour |
| `cache_clear` | cache name | 5 per hour |
| `logs_rotate` | service | 2 per day |
| `backup_run` | none | 2 per day |
| `redeploy_previous` | service | 2 per day; only if the last deploy is less than 60 minutes old and checks fail |
| `docker_prune_safe` | none | Dangling images and stopped containers only, never volumes |
| `queue_pause` / `queue_resume` | queue | Logged with reason |

## Tier 2: approval required
Database restore or schema change; deleting data or volumes; firewall, SSH or DNS changes; secrets rotation; migrations or rollbacks involving migrations; server resize or reboot; changing monitoring or backups; any command not on this list.

## Never
Root shell; reading `.env` or key files; exporting customer data; disabling backups, monitoring or logging; sending messages to customers; spending money.

## Approval protocol
Ask in the owner's verified channel with: action, why, risk, rollback plan. Proceed only on an explicit "approve" from the verified owner account. Approvals expire after 15 minutes.

# Database slow or down

1. `db_health`: connections near max? long-running queries? disk full? WAL or replication issues?
2. If connections exhausted: `container_restart` app and worker (Tier 1) to release them; look for a connection leak in recent deploys.
3. If disk is full: go to `03-disk-full.md`; do not delete database files.
4. If queries are slow after a deploy: consider `redeploy_previous`; escalate with the slow query list.
5. If the database container is down: `service_status`; `logs_tail` database; one `container_restart` (Tier 1 if listed, otherwise Tier 2). Never delete volumes.
6. If corruption is suspected: **stop writes** by pausing queues and the app (Tier 2), escalate immediately, and prepare the restore plan (`backup_status`, latest good backup, estimated downtime).
7. After recovery: check bookings created during the incident are consistent (no half-written bookings); report counts to the owner.

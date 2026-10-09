# Bad deploy (errors after a release)

1. `deploy_history`: when did the last deploy happen and what changed?
2. Compare error rate before and after (`error_summary`). If errors started within minutes of the deploy: suspect the deploy.
3. If the release has **no migration**: Tier 1 `redeploy_previous`. Verify with `http_check` and a booking-API check.
4. If the release **included a migration**: do not roll back automatically. Tier 2: escalate with the migration name and whether it is backward compatible. Options: forward-fix, or restore.
5. After rollback: freeze deploys, open an issue with the failing commit and logs, notify the owner.
6. Add a regression test before re-deploying.

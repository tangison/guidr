# Daily check (run every morning, Africa/Windhoek)

1. `http_check` on home, search, one experience page, sign-in, `/api/health`. Expect 200 and under 800 ms.
2. `service_status` for app, worker, redis, database, proxy. Expect no restarts in 24 h.
3. `host_metrics`: CPU under 70 percent average, memory under 80 percent, disk under 80 percent.
4. `backup_status`: last run under 26 hours, size within 30 percent of normal, offsite copy present.
5. `cert_expiry` for all domains: over 14 days.
6. `queue_depth`: no growing backlog, failed jobs under 5.
7. `error_summary`: new error types in the last 24 h.
8. Business checks: booking requests created yesterday, emails sent, invoices due this week.
9. Summary message to the owner: all clear, or list of findings with actions taken and anything needing approval.

# Job queue backlog (emails, reminders, billing, AI calls)

1. `queue_depth` for each queue; identify the growing one.
2. `logs_tail` worker for repeated failures (provider outage, invalid templates, timeouts).
3. If an external provider is down (email, WhatsApp, OpenRouter): `queue_pause` the affected queue, notify the owner, resume when healthy. Planner falls back to scripted mode automatically.
4. If jobs fail because of a bug: pause, capture an example failing job, escalate.
5. After the fix: `job_retry` failed jobs in batches of 20; watch for duplicates (reminders, invoices).
6. Confirm no duplicate customer messages were sent.

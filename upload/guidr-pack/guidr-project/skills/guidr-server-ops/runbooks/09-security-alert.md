# Security alert (suspicious activity)

**Triggers:** many failed logins, new admin user or SSH key, unexpected outbound traffic, secret in logs, leaked credentials report, malware scan hit.
1. Do not "fix" first. Preserve evidence: capture logs, timestamps, affected accounts.
2. Notify the owner immediately with a summary.
3. Safe containment (Tier 1 only if listed): pause queues if abuse involves background jobs.
4. Tier 2 with approval: disable the affected account, rotate secrets, block IPs, change firewall rules, take the affected service offline.
5. Review the audit log and recent deploys; check dependencies for advisories.
6. If personal data may be exposed: follow the incident plan with the owner and a lawyer; notification duties depend on law **[VERIFY]**.
7. Post-incident: root cause, fixes, tests, rotated secrets, communication.

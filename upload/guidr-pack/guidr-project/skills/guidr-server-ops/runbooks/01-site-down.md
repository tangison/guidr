# Site down or 5xx errors

**Symptoms:** `http_check` fails or returns 5xx; uptime alert.
1. Determine scope: marketing (Vercel) or app (Hetzner)? Check Vercel status and the app domain separately.
2. `service_status`: is the proxy up? is the app container running or restarting?
3. `logs_tail` app and proxy (last 200 lines). Look for out-of-memory, port conflicts, database connection errors, failed deploy.
4. If the app container is stopped or crash-looping and a deploy happened in the last 60 minutes: Tier 1 `redeploy_previous`. Re-check.
5. If out of memory: `container_restart` app once; check `host_metrics`; escalate if it repeats.
6. If database errors: go to `02-db-slow-or-down.md`.
7. If proxy or certificate errors: go to `05-ssl-problems.md`.
8. If DNS or CDN issue (Cloudflare): Tier 2; escalate with evidence.
9. If not recovered in 10 minutes: escalate. Post status on `status.getguidr.com` (owner approval).

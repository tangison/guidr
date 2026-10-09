# SSL or certificate problems

1. `cert_expiry` for each domain; `http_check` shows the error (expired, mismatch, chain).
2. If expiring in under 14 days or expired: check Coolify or Dokploy certificate status; `logs_tail` proxy for ACME errors (rate limit, DNS challenge failure, port 80 blocked).
3. Safe step: `container_restart` proxy (Tier 1) to retry issuance.
4. If DNS or Cloudflare proxy settings are the cause (for example challenge blocked): Tier 2; escalate.
5. Verify after fix: all subdomains return valid certificates and HSTS is still set.

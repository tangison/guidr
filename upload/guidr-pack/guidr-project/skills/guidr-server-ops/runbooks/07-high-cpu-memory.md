# High CPU or memory

1. `host_metrics`; identify the service using resources (`service_status`).
2. Check for traffic spikes (marketing, bots): `logs_tail` proxy for request patterns; check Cloudflare analytics.
3. If a bot or scraper: recommend rate limiting or a WAF rule (Tier 2).
4. If a single container leaks memory: `container_restart` once; note the time; escalate if it recurs within an hour.
5. If the worker is stuck in a loop: `queue_pause`, inspect failing jobs, `job_retry` selectively.
6. If sustained organic growth: recommend scaling the server; Tier 2.

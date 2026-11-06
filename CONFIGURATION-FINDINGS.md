# Configuration Findings

Name: YOUR NAME
Date: 5 November 2026

## Dependency scan results

| Tool | Issues before | Issues after | Notes |
| --- | --- | --- | --- |
| Snyk Open Source | Not captured in the available local record | 17 issues, 49 vulnerable paths | Express and lodash were upgraded; remaining findings are recorded below for Friday |
| OWASP Dependency-Check | Not run locally in this session | Not run locally in this session | Run dependency-check-report and record the report totals |

## Configuration issues

| # | Setting or issue | Risk | Fix | Evidence |
| --- | --- | --- | --- | --- |
| 1 | X-Powered-By header and missing security headers | Reveals software and reduces browser protection | Helmet | Browser headers show CSP and X-Content-Type-Options; X-Powered-By is absent |
| 2 | Stack traces shown to visitors | Leaks file paths and application internals | Generic error handler | /settings?data=bad returns a generic JSON error |
| 3 | Secrets written in code | Repository readers can recover the values | Environment variables and .env.example | API_KEY and DB_PASSWORD now come from process.env |
| 4 | No access control on admin function | Unauthorized users could use the route | Deny-by-default API key check | /admin returned 403 without the key and 200 with demo-key |
| 5 | Outdated libraries | Known CVEs may remain exploitable | Updated express and lodash | Snyk now reports 17 dependency issues rather than the earlier set |

## Remaining findings to handle on Friday

The current Snyk Open Source scan reports 17 issues across 49 vulnerable paths, including findings introduced through sqlite3 dependencies. OWASP Dependency-Check should be run with the configured NVD key before finalizing accepted risks. The committed API and database password values should be treated as exposed and rotated; the repository history may still contain them.

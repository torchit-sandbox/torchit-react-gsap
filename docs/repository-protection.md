# Repository Protection Baseline

This document describes the free GitHub-native protection baseline for this repository.

## Goal

Protect `main` from broken builds, high-severity production dependency issues, and accidental direct changes.

## Current free baseline

The repository uses only GitHub-native features and npm tooling:

- GitHub Actions CI
- npm deterministic install with `npm ci`
- production dependency audit with `npm audit --omit=dev --audit-level=high`
- production build check with `npm run build`
- Dependabot updates for npm and GitHub Actions
- manual branch protection in GitHub repository settings

No paid third-party scanners or paid deployment services are required for this baseline.

## Required branch protection for `main`

After the CI workflow has run successfully at least once on `main`, enable branch protection for the `main` branch.

Recommended settings:

- Require a pull request before merging
- Require at least 1 approval
- Dismiss stale pull request approvals when new commits are pushed
- Require conversation resolution before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Require the `Build and dependency audit` status check
- Block force pushes
- Block branch deletions
- Do not allow direct pushes to `main`

If available in the organization/repository plan, also enable:

- Do not allow bypassing the above settings
- Restrict who can push to matching branches

## Repository security settings

Enable all free security features available in the repository settings:

- Dependabot alerts
- Dependabot security updates
- Secret scanning, if available
- Push protection, if available

If GitHub asks for a paid upgrade, skip that option for now.

## Merge flow

Use this flow for normal development:

1. Create a feature branch from `main`.
2. Open a pull request into `main`.
3. Wait for CI to pass.
4. Request review.
5. Merge only after approval and green checks.

## Current CI check

The required CI job is:

```bash
npm ci
npm audit --omit=dev --audit-level=high
npm run build
```

The audit intentionally checks production dependencies first to avoid blocking releases on noisy development-only tooling advisories. A broader full audit can be added later as a scheduled informational workflow.

## Future phases

Do not add CD until the hosting target is selected.

Future work may include:

- preview deployments for pull requests
- production deployment from `main`
- environment variables through the hosting provider
- API health checks once the backend/API repository exists
- security headers through hosting or reverse proxy configuration
- uptime monitoring and error tracking before public launch

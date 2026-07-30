# Security Policy

## Purpose

Arcade™ is a static, local-first website in the Verve N Veda public network. This policy explains how to report a possible security concern responsibly.

## Supported Version

Security corrections are applied to the current public version of the Arcade landing page and its actively maintained game files.

Older copied, downloaded, or independently hosted versions may not receive updates.

## Reporting a Vulnerability

Please do not publish a suspected vulnerability in a public issue, discussion, social post, or pull request before it has been reviewed.

Report the concern privately to the project owner through an established Verve N Veda contact channel. Include:

- the affected page or filename;
- clear steps that reproduce the issue;
- the browser and device used;
- screenshots or console messages when useful;
- the possible impact;
- whether the issue involves another Verve N Veda repository.

Do not include passwords, private account information, personal records, access tokens, or unrelated personal data.

## Response Process

A good-faith report will be reviewed as time and resources permit. The project may:

1. confirm that the report was received;
2. reproduce and assess the issue;
3. correct the affected file or link;
4. review similar pages for the same pattern;
5. publish a brief correction note when appropriate.

## In Scope

Examples include:

- unsafe script injection;
- unexpected external network requests;
- exposed secrets or credentials;
- broken access boundaries;
- unsafe redirects;
- downloadable files containing unintended private information;
- dependency or workflow configurations with excessive permissions;
- security-sensitive mistakes in localStorage handling.

## Out of Scope

The following are generally not security vulnerabilities:

- visual defects;
- spelling errors;
- ordinary broken links;
- missing browser features;
- local changes made through browser developer tools;
- data a visitor intentionally stores in their own browser;
- attacks requiring control of the visitor's device or browser profile.

## Safe Research Expectations

Please:

- avoid disrupting the public site;
- avoid automated traffic that could burden GitHub Pages;
- do not access, alter, retain, or disclose another person's data;
- stop testing after confirming the minimum evidence needed;
- allow reasonable time for review before public disclosure.

## Architecture Note

Arcade™ is designed without user accounts, server-side databases, advertising trackers, analytics, payment processing, or remote application services. Most preferences remain in the visitor's browser.

This policy is not a promise that every defect can be corrected immediately, but it establishes a responsible path for reporting and review.

# XSS Review Notes

Name: YOUR NAME

Date: 4 November 2026

## Finding 1: Reflected XSS in the /search route

- Where untrusted data enters: the q value in the web address (req.query.q)

- Where it is output: written into the response by res.json in the /search route

- Why it is dangerous: The attacker-controlled value could be interpreted as executable HTML or JavaScript if it was inserted into the response without encoding.

- Fix applied: The route now returns JSON instead of inserting the query into an HTML response, and Express does not add the X-Powered-By header.

- Defence layers used: validation on input / encoding on output / CSP in the browser

- How I retested: Started the application, requested /search with a script payload, and confirmed that it was returned as JSON data rather than executable HTML. I also confirmed that the response included Content-Security-Policy: default-src 'self'.

## What SonarQube for IDE said about /search

I did not observe a SonarQube for IDE warning for the /search route in Problems for app.js during this review.

## One thing I would check in the next app I review

I would check every route that renders or reflects request data to confirm that output encoding, validation, CSP, and other framework protections are applied consistently.

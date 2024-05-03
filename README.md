# currency-zip-ui

![version](https://img.shields.io/badge/version-v0.1.0-white) ![forks](https://img.shields.io/github/forks/ricardoaugusto/currency-zip-ui
)

# Purpose

To make banking/invoicing easier. Add currency conversion between multiple income sources and aggregate the total into a single currency.

# Installation

You must have installed  [currency-zip](https://github.com/ricardoaugusto/currency-zip) prior to using this UI.

1. Clone this repo
2. `npm install`
3. Create an `.env` file with your [currency-zip](https://github.com/ricardoaugusto/currency-zip) API endpoint
4. `npm run dev`

# Usage

It's as simple as typing the following values:

```"100EUR + 250USD + 1000BRL to GBP"
438.46GBP on 20240415
```

To get the exchange rate for a specific date, use `YYYYMMDD` in the date field:

```"100EUR + 250USD + 1000BRL to GBP" 20240101
445.61GBP on 20240101
```

# Testing

Soon.

# Contributing

Thank you for your interest in currency-zip-ui! Before you start working and submit a PR, please review the instructions below.

- Lint your code with `black`
- Achieve 100% test coverage
- Make sure your tests pass
- Update the readme.md if needed

Thanks!
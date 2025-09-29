<!-- # Playwright Amazon Automation Framework

Automated tests for Amazon.in using **Playwright + JavaScript** with **Page Object Model (POM)** architecture.

---

## 📂 Project Structure

playwright-amazon-framework/
├─ pages/ # Page Object Models
│ └─ LoginPage.js
├─ tests/ # Test/spec files
│ ├─ login.spec.js
│ └─ ProductPage.spec.js
├─ test-data/ # Test data JSON files
│ └─ users.json
├─ screenshots/ # Screenshots captured on failures
├─ playwright.config.js # Playwright configuration
├─ package.json # Node.js dependencies
└─ README.md # This file



---

## 📦 Setup Instructions

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd playwright-amazon-framework


Install dependencies: 
npm install

Install Playwright browsers:
npx playwright install

Run all tests:
npx playwright test

Run a single test file:
npx playwright test tests/login.spec.js

Run Product & Cart tests (login first):
npx playwright test tests/ProductPage.spec.js

Run tests in headed/debug mode:
 npx playwright test --headed --debug

HTML Report:
npx playwright show-report

JUnit XML Report (for CI/CD):
JUnit XML Report (for CI/CD)

Allure Report (optional):

npm install -D allure-playwright
npx playwright test --reporter=line,allure-playwright
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
 -->

// // // pages/LoginPage.js
// // class LoginPage {
// //     constructor(page) {
// //         this.page = page;
// //         this.signInHover = page.locator('text=Hello, sign in'); // hover element
// //         this.signInButton = page.locator('.nav-action-inner');   // click to open login form
// //         this.emailInput = page.locator('#ap_email_login');
// //         this.passwordInput = page.locator('#ap_password');
// //         this.submitButton = page.locator('.a-button-input');
// //     }

// //     async navigate() {
// //         await this.page.goto('https://www.amazon.in/');
// //     }

// //     async loginWithValidCredentials(email, password) {
// //         // Add missing hover + click steps
// //         await this.signInHover.hover();
// //         await this.signInButton.click();

// //         await this.emailInput.fill(email);
// //         await this.submitButton.click();
// //         await this.passwordInput.fill(password);
// //         await this.submitButton.click();
// //     }
// // }

// // module.exports = { LoginPage };
// // pages/LoginPage.js
// const { expect } = require('@playwright/test');

// class LoginPage {
//     constructor(page) {
//         this.page = page;

//         // ---- Common locators ----
//         this.signInHover   = page.locator('text=Hello, sign in'); // hover to open menu
//         this.signInButton  = page.locator('.nav-action-inner');   // click to open login form
//         this.emailInput    = page.locator('#ap_email_login');
//         this.passwordInput = page.locator('#ap_password');
//         this.submitButton  = page.locator('.a-button-input');
//         this.errorMessage  = page.locator('.a-alert-content');    // generic error container
//     }

//     /** Navigate to Amazon home */
//     async navigate() {
//         await this.page.goto('https://www.amazon.in/');
//     }

//     /** Open the sign-in form */
//     async openSignInForm() {
//         await this.signInHover.hover();
//         await this.signInButton.click();
//     }

//     /** Attempt login with only an email (used for invalid email test) */
//     async loginWithEmail(email) {
//         await this.openSignInForm();
//         await this.emailInput.fill(email);
//         await this.submitButton.click();
//     }

//     /** Validate the expected invalid-email message */
//     async handleInvalidEmail(expectedText = 'Invalid email address.') {
//         await expect(this.errorMessage).toHaveText(expectedText);
//     }

//     /** Full valid-credentials login flow */
//     async loginWithValidCredentials(email, password) {
//         await this.openSignInForm();
//         await this.emailInput.fill(email);
//         await this.submitButton.click();
//         await this.passwordInput.fill(password);
//         await this.submitButton.click();
//     }

//     /** Verify that the correct user is shown after login */
//     async verifyLogin(username) {
//         const userLocator = this.page.locator(`text=Hello, ${username}`);
//         await expect(userLocator).toBeVisible({ timeout: 10000 });
//     }
// }

// module.exports = { LoginPage };



// pages/LoginPage.js
const { expect } = require('@playwright/test');   // ✅ import expect

class LoginPage {
  constructor(page) {
    this.page          = page;
    this.signInHover   = page.locator('text=Hello, sign in');
    this.signInButton  = page.locator('.nav-action-inner');
    this.emailInput    = page.locator('#ap_email_login, #ap_email');
    this.passwordInput = page.locator('#ap_password');
    this.continueBtn   = page.locator('#continue');
    this.submitButton  = page.locator('#signInSubmit, .a-button-input');
    this.errorMessage = page.locator('.a-alert-content').nth(2); // for invalid email
    this.crossbutton = page.locator('[role="presentation"]').nth(1);
    this.greeting      = username =>
      this.page.locator(`text=Hello, ${username}`);
  }

  async navigate() {
    await this.page.goto('https://www.amazon.in/');
  }

  async openSignInForm() {
    await this.signInHover.hover();
    await this.signInButton.click();
  }

  /** Try logging in with just an email (used for invalid-email test) */
  async loginWithEmail(email) {
    await this.openSignInForm();
    await this.emailInput.fill(email);
    if (await this.continueBtn.isVisible()) {
      await this.continueBtn.click();
    } else {
      await this.submitButton.click();
    }
  }

  /** Validate the expected invalid-email message */
  async handleInvalidEmail(expectedText = 'Invalid email address.') {
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
    await expect(this.errorMessage).toContainText(expectedText);
    await this.crossbutton.click()
    await this.page.goto('https://www.amazon.in/')
  }

  async loginWithValidCredentials(email, password) {
    await this.openSignInForm();
    await this.emailInput.fill(email);
    if (await this.continueBtn.isVisible()) {
      await this.continueBtn.click();
    } else {
      await this.submitButton.click();
    }
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async verifyLogin(username) {
    await expect(this.greeting(username)).toBeVisible({ timeout: 15000 });
  }
}

module.exports = { LoginPage };

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users = require('../test-data/users.json');

test('Amazon login test with invalid and valid user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to Amazon', async () => {
        await loginPage.navigate();
    });

    await test.step('Validate invalid email login', async () => {
        await loginPage.loginWithEmail(users.invalidUser.email);
        await loginPage.handleInvalidEmail();
    });

    await test.step('Login with valid credentials', async () => {
        await loginPage.loginWithValidCredentials(
            users.validUser.email,
            users.validUser.password
        );
    });

    await test.step('Verify successful login', async () => {
        await loginPage.verifyLogin(users.validUser.username);
    });
});

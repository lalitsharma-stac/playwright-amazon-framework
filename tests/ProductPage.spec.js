// const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../pages/LoginPage');
// const users = require('../test-data/users.json');

// let page;

// test.describe('Product Page Tests (login first)', () => {

//     test.beforeAll(async ({ browser }) => {
//         page = await browser.newPage();
//         const loginPage = new LoginPage(page);
//         await loginPage.navigate();
//         await loginPage.loginWithValidCredentials(users.validUser.email, users.validUser.password);

//         // wait until user is logged in
//         const userLocator = page.locator(`text=Hello, ${users.validUser.username}`);
//         await expect(userLocator).toBeVisible({ timeout: 10000 });
//     });

//     // test.afterAll(async () => {
//     //     await page.close();
//     // });

//     test('Search laptops and print sort options', async () => {
//         await page.locator('#twotabsearchtextbox').click();
//         await page.locator('#twotabsearchtextbox').fill('laptops');
//         await page.locator('#nav-search-submit-button').click();


//         // Click dropdown to open options
//     await page.locator('span.a-button-text.a-declarative[data-action="a-dropdown-button"]').click();
//     // Wait for the first dropdown option to be visible to ensure dropdown is open
//    await page.locator('#s-result-sort-select_1').waitFor({ state: 'visible', timeout: 60000 });


//     for (let i = 1; i <= 5; i++) {
//         console.log(`Looking for option ${i}`);
//         const optionId = `#s-result-sort-select_${i}`;
//         const option = await page.$(optionId);
//         if (option) {
//             const text = await option.innerText();
//             console.log(text);
//         } else {
//             console.log(`Option with id ${optionId} not found.`);
//         }
//     }
//     });

    
//   test('Sort by Price: Low to High and add cheapest laptop to cart', async () => {
//     // // 1️⃣ Search for laptops


//     await page.waitForSelector('button[name="submit.addToCart"]');

// // Click the first "Add to cart" button
// await page.locator('button[name="submit.addToCart"]').first().click();
// console.log('Clicked the first Add to cart button.');

//     // 6️⃣ Assert that the cart count increased
//     const cartCount = page.locator('#nav-cart-count');
//     await expect(cartCount).not.toHaveText('0');
//     await page.waitForTimeout(3000);


//    await page.locator('#twotabsearchtextbox').click();
//    await page.locator('#twotabsearchtextbox').fill('');
//    await page.locator('#twotabsearchtextbox').fill('refrigerators');
//    await page.locator('#nav-search-submit-button').click();
//  await page.waitForSelector('button[name="submit.addToCart"]');
//    await page.locator('button[name="submit.addToCart"]').first().click();
// console.log('Clicked the first Add to cart button.');


// await page.locator('#twotabsearchtextbox').click();
//    await page.locator('#twotabsearchtextbox').fill('');
//    await page.locator('#twotabsearchtextbox').fill('oven');
//    await page.locator('#nav-search-submit-button').click();
//    await page.waitForSelector('button[name="submit.addToCart"]');
//    await page.locator('button[name="submit.addToCart"]').first().click();
// console.log('Clicked the first Add to cart button.');

// await page.locator('#nav-cart-count').click();
// await page.locator('button.a-declarative[aria-label^="Delete"]').first().click();
// await page.screenshot({ path: 'after-add-to-cart.png', fullPage: true });

// await page.locator('#sc-buy-box-ptc-button').waitFor({ state: 'visible', timeout: 90000 });
// await page.locator('#sc-buy-box-ptc-button').click();

// await page.locator('.a-declarative').nth(4).click({ timeout: 60000 });

// await page.locator('#add-new-address-desktop-sasp-tango-link').click();
// await page.locator('#address-ui-widgets-enterAddressFullName').click();
// await page.locator('#address-ui-widgets-enterAddressFullName').fill('Testing purpose');
// await page.locator('#address-ui-widgets-enterAddressPhoneNumber').click();
// await page.locator('#address-ui-widgets-enterAddressPhoneNumber').fill('1234567892');
// await page .locator('#address-ui-widgets-enterAddressPostalCode').click();
// await page.locator('#address-ui-widgets-enterAddressPostalCode').fill('160055');
// await page.locator('#address-ui-widgets-enterAddressLine1').click();
// await page.locator ('#address-ui-widgets-enterAddressLine1').fill('Mohali, punjab');
// await page.locator ('#address-ui-widgets-enterAddressLine2').click();
// await page.locator('#address-ui-widgets-enterAddressLine2').fill('Iota technologies');
// await page.locator('#address-ui-widgets-enterAddressCity').click();
// await page.locator('#address-ui-widgets-enterAddressCity').fill('Punjab');
// await page.locator('.a-dropdown-prompt').nth(1).click();
// await page.locator('.a-dropdown-link').nth(27).click();
// await page.locator('.a-button-input').nth(4).click();








//   });
// });
    
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const users = require('../test-data/users.json');
const checkoutData = require('../test-data/checkoutData.json');

let page;
let loginPage;
let productPage;

test.describe('Product Page Tests (login first)', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials(users.validUser.email, users.validUser.password);
    const userLocator = page.locator(`text=Hello, ${users.validUser.username}`);
    await expect(userLocator).toBeVisible({ timeout: 10000 });
  });

//   test.afterAll(async () => {
//     await page.close();
//   });

  test('Search laptops and print sort options', async () => {
    await test.step('Search for laptops', async () => {
      await productPage.searchProduct('laptops');
    });

    await test.step('Open sort dropdown', async () => {
      await productPage.openSortDropdown();
    });

    await test.step('Print available sort options', async () => {
      const options = await productPage.getSortOptions();
      options.forEach((opt, index) => console.log(`Option ${index + 1}: ${opt}`));
    });
  });

  test('Sort by Price: Low to High and add cheapest laptop to cart', async () => {
    await test.step('Add first laptop to cart', async () => {
      await productPage.addFirstProductToCart();
      console.log('Clicked the first Add to cart button.');
    });

    await test.step('Verify cart count increased', async () => {
      await expect(productPage.cartCount).not.toHaveText('0');
      await page.waitForTimeout(3000);
    });

    await test.step('Search and add refrigerator to cart', async () => {
      await productPage.searchProduct('refrigerators');
      await productPage.addFirstProductToCart();
      console.log('Clicked the first Add to cart button.');
    });

    await test.step('Search and add oven to cart', async () => {
      await productPage.searchProduct('oven');
      await productPage.addFirstProductToCart();
      console.log('Clicked the first Add to cart button.');
    });

    await test.step('Go to cart, delete first item and take screenshot', async () => {
      await productPage.cartIcon.click();
      await productPage.deleteFirstCartItem();
      await page.screenshot({ path: 'after-add-to-cart.png', fullPage: true });
    });

    await test.step('Proceed to checkout', async () => {
      await productPage.proceedToCheckout();
    });

    await test.step('Click address related button', async () => {
      await page.locator('.a-declarative').nth(4).click({ timeout: 60000 });
    });

    await test.step('Fill new address form from checkoutData', async () => {
      await productPage.fillNewAddress(checkoutData);
    });
  });
});



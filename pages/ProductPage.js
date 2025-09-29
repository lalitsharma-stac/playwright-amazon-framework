class ProductPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.sortDropdownButton = page.locator('span.a-button-text.a-declarative[data-action="a-dropdown-button"]');
    this.sortOptions = i => page.locator(`#s-result-sort-select_${i}`);
    this.addToCartButtons = page.locator('button[name="submit.addToCart"]');
    this.cartCount = page.locator('#nav-cart-count');
    this.cartIcon = page.locator('#nav-cart-count');
    this.deleteCartItemBtn = page.locator('button.a-declarative[aria-label^="Delete"]');
    this.checkoutButton = page.locator('#sc-buy-box-ptc-button');
    this.addressLink = page.locator('#add-new-address-desktop-sasp-tango-link');
    this.fullNameInput = page.locator('#address-ui-widgets-enterAddressFullName');
    this.phoneInput = page.locator('#address-ui-widgets-enterAddressPhoneNumber');
    this.postalCodeInput = page.locator('#address-ui-widgets-enterAddressPostalCode');
    this.addressLine1Input = page.locator('#address-ui-widgets-enterAddressLine1');
    this.addressLine2Input = page.locator('#address-ui-widgets-enterAddressLine2');
    this.cityInput = page.locator('#address-ui-widgets-enterAddressCity');
    this.dropdownPrompt = () => page.locator('.a-dropdown-prompt');
    this.dropdownLink = () => page.locator('.a-dropdown-link');
    this.dropdownButtonInput = () => page.locator('.a-button-input');
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async openSortDropdown() {
    await this.sortDropdownButton.click();
  }

  async getSortOptions() {
    const options = [];
    for (let i = 1; i <= 5; i++) {
      if (await this.sortOptions(i).count() > 0)
        options.push(await this.sortOptions(i).innerText());
    }
    return options;
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async deleteFirstCartItem() {
    await this.deleteCartItemBtn.first().click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.waitFor({ state: 'visible', timeout: 40000 });
    await this.checkoutButton.click();
  }

  async fillNewAddress(data) {
    await this.addressLink.click();
    await this.fullNameInput.fill(data.fullName);
    await this.phoneInput.fill(data.phoneNumber);
    await this.postalCodeInput.fill(data.postalCode);
    await this.addressLine1Input.fill(data.address1);
    await this.addressLine2Input.fill(data.address2);
    await this.cityInput.fill(data.city);
    await this.dropdownPrompt().nth(data.dropdownPromptIndex).click();
    await this.dropdownLink().nth(data.dropdownLinkIndex).click({ force: true });
    await this.dropdownButtonInput().nth(data.buttonInputIndex).click();
  }
}

module.exports = { ProductPage };

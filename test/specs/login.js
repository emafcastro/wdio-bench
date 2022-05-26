import LoginPage from "../pageobjects/login.page";
import HomePage from "../pageobjects/home.page";

describe("My Login application", () => {
    /**
     * Access to home and click on sign in button before each test
     */
    beforeEach(async () => {
        await HomePage.open();

        await HomePage.SigninBtn.click();
    });

    afterEach(async () => {
        await browser.deleteAllCookies();
    });

    /**
     * This tests allows to login with correct credentials
     */
    it("should login with valid credentials", async () => {
        await LoginPage.login(
            process.env.TEST_USERNAME,
            process.env.TEST_PASSWORD
        );

        // Add element as part of home page object
        const linkSignOut = $(`//a[contains(text(),'Sign Out')]`);
        await expect(await linkSignOut).toBeExisting();
    });

    /**
     * This test verifies the required attribute on the fields
     */
    it("should check the fields email and password are required", async () => {
        await expect(await LoginPage.inputUsername).toHaveAttr("required");
        await expect(await LoginPage.inputPassword).toHaveAttr("required");
    });

    /**
     * This test verifies the error message when a field is empty
     */
    it("should check error message when a field is empty", async () => {
        await LoginPage.login(" ", process.env.TEST_PASSWORD);

        await expect(await LoginPage.divErrorMessage.getText()).toBe(
            "* This field is required."
        );
    });

    /**
     * This test verifies the error message when there is not existing user matching the given credentials
     */
    it("should check error message when email and password do not match", async () => {
        await LoginPage.login("test", "test");

        await expect(await LoginPage.divErrorMessage.getText()).toBe(
            "* Please enter a correct Email Address and password. Note that both fields may be case-sensitive."
        );
    });
});

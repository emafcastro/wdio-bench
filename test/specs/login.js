import LoginPage from "../pageobjects/login.page";
import HomePage from "../pageobjects/home.page";

describe("Login - Valid interactions", () => {
    /**
     * Access to home and click on sign in button before each test
     */
    beforeEach(async () => {
        await HomePage.open();
        await HomePage.signinBtn.click();
    });

    afterEach(async () => {
        await browser.deleteAllCookies();
    });

    /**
     * This tests allows to login with correct credentials
     */
    it("should login with valid credentials", async () => {
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASSWORD);

        await expect(HomePage.signOutLink).toBeExisting();
    });

    /**
     * This test verifies the required attribute on the fields
     */
    it("should check the fields email and password are required", async () => {
        await expect(LoginPage.emailField).toHaveAttr("required");
        await expect(LoginPage.passwordField).toHaveAttr("required");
    });
});

describe("Login - Interactions with validations", () => {
    beforeEach(async () => {
        await HomePage.open();

        await HomePage.signinBtn.click();
    });

    /**
     * This test verifies if the field email only allows 254 characters
     * The test is done with 254 characters and with more than the allowed characters
     */
    it("should allow it add only 254 characters in email field", async () => {
        let chars = "abcdefghijklmnopqrstuvwxyz1234567890";
        let string = "";
        for (let ii = 0; ii < 244; ii++) {
            string += chars[Math.floor(Math.random() * chars.length)];
        }
        const email = string + "@gmail.com";

        await LoginPage.emailField.setValue(email);
        await expect(LoginPage.emailField).toHaveValue(email);

        const newEmail = email + "extra";
        await LoginPage.emailField.setValue(newEmail);
        await expect(LoginPage.emailField).toHaveValue(email);
    });

    /**
     * This test verifies the error message when a field is empty
     */
    it("should check error message when a field is empty", async () => {
        await LoginPage.login(" ", process.env.TEST_PASSWORD);

        await expect(LoginPage.errorMessage).toHaveText("* This field is required.");
    });

    /**
     * This test verifies the error message when there is not existing user matching the given credentials
     */
    it("should check error message when email and password do not match", async () => {
        await LoginPage.login("test", "test");

        await expect(LoginPage.errorMessage).toHaveText(
            "* Please enter a correct Email Address and password. Note that both fields may be case-sensitive."
        );
    });
});

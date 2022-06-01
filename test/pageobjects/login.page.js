import Page from "./page";

class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get emailField() {
        return $('//*[@id="id_username"]');
    }

    get passwordField() {
        return $('//*[@id="id_password"]');
    }

    get signInBtn() {
        return $("<button>");
    }

    get errorMessage() {
        return $(".error-messages"); //Css Locator
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password) {
        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.signInBtn.click();
    }

    open() {
        return super.open("login/");
    }
}

export default new LoginPage();

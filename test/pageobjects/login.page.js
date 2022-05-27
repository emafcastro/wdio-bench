

import Page from './page';

class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('//*[@id="id_username"]');
    }

    get inputPassword () {
        return $('//*[@id="id_password"]');
    }

    get btnSubmit () {
        return $('<button>');
    }

    get divErrorMessage(){
        return $('.error-messages') //Css Locator
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('login/');
    }
}

export default new LoginPage();

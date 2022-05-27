import Page from './page';

class SignupPage extends Page {
  
    get signoutBtn() {
        return $('/html/body/nav/div/ul/li[4]/a');
    }

    get yourNameField() {
        return $('//*[@id="id_name"]');
    }

    get emailField() {
        return $('//*[@id="id_email"]');
    }

    get passwordField() {
        return $('//*[@id="id_password"]');
    }

    get signupBtn() {
        return $('/html/body/div/div/div/div/form/button');
    }

    get errorMessage() {
        return $('/html/body/div/div/div/div/form/form/ul');
    }

    get errMessDubMail () {
        return $('//*[@id="email-exists"]/ul/li');
    }
    
    async signup (yourname, email, password) {
        await this.yourNameField.setValue(yourname);
        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        await this.signupBtn.click();
    }

    open () {
        return super.open('register');
    }

}

export default new SignupPage();
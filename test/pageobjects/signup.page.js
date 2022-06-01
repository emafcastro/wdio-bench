import Page from './page';

class SignupPage extends Page {
  
    get signoutBtn() { return $('/html/body/nav/div/ul/li[4]/a') }
    //get yourNameField() { return $('//*[@id="id_name"]') }
    //get emailField() { return $('//*[@id="id_email"]') }
    //get passwordField() { return $('//*[@id="id_password"]') }
    get signupBtn() { return $('/html/body/div/div/div/div/form/button') }
    get errorMessage() { return $('.error-messages') }
    get errMessEmailinUse () { return $('/html/body/div/div/div/div/form/fieldset[2]/div/ul/li') }
    
    async field(var1) {
        return $('//*[@id="'+var1+'"]')
    }
    
    async signup(yourname, youremail, password) {
        await (await this.field("id_name")).setValue(yourname);
        await (await this.field("id_email")).setValue(youremail);
        await (await this.field("id_password")).setValue(password);
        //await this.yourNameField.setValue(yourname);
        //await this.emailField.setValue(youremail);
        //await this.passwordField.setValue(password);
        await this.signupBtn.click();
    }

    open () {
        return super.open('register');
    }

}

export default new SignupPage();
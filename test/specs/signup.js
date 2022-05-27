import HomePage from  '../pageobjects/home.page';
import SignupPage from  '../pageobjects/signup.page';

describe('open sign up landing page', () => {

    it('should open sign up landing page', async () => {

        await HomePage.open();
        await HomePage.signupBtn.click();
        await expect(browser).toHaveUrl("https://realworld-djangoapp.herokuapp.com/register/");

    });

});

describe('test functionality of Have an account link', () => {

    it('should open login page', async () => {

        const accountLink = await $('/html/body/div/div/div/div/p/a');
        await HomePage.open();
        await HomePage.signupBtn.click();
        await accountLink.click();
        await expect(browser).toHaveUrl("https://realworld-djangoapp.herokuapp.com/login/");

    });

});

describe('tests for Your Name field', () => {

    const randomName = Math.random().toString(36).substring(7);
    const randomEmail = Math.random().toString(36).substring(7) + '@test.com';
    const randomPassword = Math.random().toString(36).substring(7);

    beforeEach(async () => {
        await HomePage.open();
        await HomePage.signupBtn.click();
    })

    it('test with blank Name field', async () => {

        /*await SignupPage.yourNameField.setValue('');
        await SignupPage.emailField.setValue(randomEmail);
        await SignupPage.passwordField.setValue(randomPassword);
        await SignupPage.signupBtn.click();*/
        await expect(SignupPage.yourNameField).toHaveAttribute('required');
        
    });
    

    it('test with only spaces in Name field', async () => {

        await SignupPage.yourNameField.setValue('            ');
        await SignupPage.emailField.setValue(randomEmail);
        await SignupPage.passwordField.setValue(randomPassword);
        await SignupPage.signupBtn.click();
        await expect(SignupPage.errorMessage).toHaveText('* This field is required.');
        
    });

});

describe('Tests for Email field', () => {

    const randomName = Math.random().toString(36).substring(7);
    const randomEmail = Math.random().toString(36).substring(7) + '@test.com';
    const randomPassword = Math.random().toString(36).substring(7);
    const email = randomEmail;
    
    beforeEach(async () => {
        await HomePage.open();
        await HomePage.signupBtn.click();
    })

    afterEach(async ()=>{
        await browser.deleteAllCookies()
    })

    it('test with blank Email field', async () => {

        await SignupPage.yourNameField.setValue(randomName);
        await SignupPage.emailField.setValue('');
        await SignupPage.passwordField.setValue(randomPassword);
        await SignupPage.signupBtn.click();
        await expect(SignupPage.emailField).toHaveAttribute('required');
        
    });

    it('test with only spaces in Email field', async () => {

        await SignupPage.yourNameField.setValue(randomName);
        await SignupPage.emailField.setValue('            ');
        await SignupPage.passwordField.setValue(randomPassword);
        await SignupPage.signupBtn.click();
        await expect(SignupPage.emailField).toHaveAttribute('required');
        
    });

    it('email already exists', async () => {

        await SignupPage.yourNameField.setValue(randomName);
        await SignupPage.emailField.setValue(email);
        await SignupPage.passwordField.setValue(randomPassword);
        await SignupPage.signupBtn.click();
        await SignupPage.signoutBtn.click();
        await HomePage.open();
        await HomePage.signupBtn.click();
        await SignupPage.yourNameField.setValue(randomName);
        await SignupPage.emailField.setValue(email);
        await expect(SignupPage.errMessDubMail).toHaveText('This email is in use.');

    });

});

describe('sign up happy path', () => {

    const randomName = Math.random().toString(36).substring(7);
    const randomEmail = Math.random().toString(36).substring(7) + '@test.com';
    const randomPassword = Math.random().toString(36).substring(7);

    beforeEach(async () => {
        await HomePage.open();
        await HomePage.signupBtn.click();
    });

    it('should sign up correctly', async () => {

        await SignupPage.signup(randomName, randomEmail, randomPassword);
        await expect(SignupPage.signoutBtn).toHaveText('Sign Out');

    });
});

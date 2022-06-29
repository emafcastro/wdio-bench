import HomePage from  '../pageobjects/home.page';
import SignupPage from  '../pageobjects/signup.page';

describe("Sign up tests", ()=>{

    describe('Open sign up landing page', () => {

        it('should open sign up landing page', async () => {

            await HomePage.open();
            await HomePage.signupBtn.click();
            await expect(browser).toHaveUrl("https://realworld-djangoapp.herokuapp.com/register/");

         });

    });

    describe('Test functionality of Have an account link', () => {

        it('should open login page', async () => {

            const accountLink = await $('/html/body/div/div/div/div/p/a');
            await HomePage.open();
            await HomePage.signupBtn.click();
            await accountLink.click();
            await expect(browser).toHaveUrl("https://realworld-djangoapp.herokuapp.com/login/");

        });

    });

    describe('Tests for Your Name field', () => {

        const randomName = Math.random().toString(36).substring(7);
        const randomEmail = Math.random().toString(36).substring(7) + '@test.com';
        const randomPassword = Math.random().toString(36).substring(7);

        beforeEach(async () => {
            await HomePage.open();
            await HomePage.signupBtn.click();
        })

        it('test with blank Name field', async () => {

            //await expect(SignupPage.yourNameField).toHaveAttribute('required');
            await expect(SignupPage.field("id_name")).toHaveAttribute('required');
            
        });
        

        it('test with only spaces in Name field', async () => {

            await SignupPage.signup('           ', randomEmail, randomPassword);
            await SignupPage.signupBtn.click();
            await expect(SignupPage.errorMessage).toHaveText('* This field is required.');
            
        });

    });

    describe('Tests for Email field', () => {

        const randomName = Math.random().toString(36).substring(7);
        const randomEmail = Math.random().toString(36).substring(7) + '@test.com';
        const randomEmail2 = Math.random().toString(36).substring(7) + '@test.com';
        const randomPassword = Math.random().toString(36).substring(7);
        const email = randomEmail;
        const email2 = randomEmail2;
        
        beforeEach(async () => {
            await HomePage.open();
            await HomePage.signupBtn.click();
        })

        afterEach(async () => {
            await browser.deleteAllCookies();
        })

        it('test with blank Email field', async () => {

            //await expect(SignupPage.emailField).toHaveAttribute('required');
            await expect(SignupPage.field("id_email")).toHaveAttribute('required');
            
        });

        it('test with only spaces in Email field', async () => {

            //await expect(SignupPage.emailField).toHaveAttribute('required');
            await expect(SignupPage.field("id_email")).toHaveAttribute('required');
            
        });

        it('Test with attribute type=email', async () => {

            const emailField = await SignupPage.field("id_email");
            const attr = await emailField.getAttribute('type');
            await expect(attr).toBe('email');

        });

        it('Test with invalid email field', async () => {

            await SignupPage.signup(randomName, 'test@test', randomPassword);
            await expect(SignupPage.errorMessage).toHaveText('* Enter a valid email address.')

        });

        it('Test this email is in use', async () => {

            await SignupPage.signup(randomName, email, randomPassword);
            await HomePage.signOutLink.waitForDisplayed();
            await HomePage.signOutLink.click();
            await HomePage.open();
            await HomePage.signupBtn.click();
            await (await SignupPage.field("id_name")).addValue(randomName); 
            await (await SignupPage.field("id_email")).addValue(email);
            await expect(SignupPage.errorMessage).toHaveText('This email is in use.');

        });

        it('Test this email already exists', async () => {

            await SignupPage.signup(randomName, email2, randomPassword);
            await HomePage.signOutLink.waitForDisplayed();
            await HomePage.signOutLink.click();
            await HomePage.open();
            await HomePage.signupBtn.click();
            await SignupPage.signup(randomName, email2, randomPassword);
            await expect(SignupPage.errorMessage).toHaveText('* User with this Email Address already exists.');

        });

    });

    describe('Tests for Password field', () => {

        beforeEach(async () => {
            await HomePage.open();
            await HomePage.signupBtn.click();
        });

        afterEach(async ()=>{
            await browser.deleteAllCookies()
        })

        it('Test with blank password field', async () => {

            //await expect(SignupPage.passwordField).toHaveAttribute('required');
            await expect(SignupPage.field("id_password")).toHaveAttribute('required');
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

        afterEach(async ()=>{
            await browser.deleteAllCookies()
        })

        it('should sign up correctly', async () => {

            await SignupPage.signup(randomName, randomEmail, randomPassword);
            await expect(SignupPage.signoutBtn).toHaveText('Sign Out');

        });
    });
});
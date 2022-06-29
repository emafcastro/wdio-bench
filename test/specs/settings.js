import HomePage from  '../pageobjects/home.page';
import SignupPage from  '../pageobjects/signup.page';
import SettingsPage from  '../pageobjects/settings.page';
import LoginPage from  '../pageobjects/login.page';
import ProfilePage from '../pageobjects/profile.page';
const readWriteFile = require("../helpers/readWriteFile");

describe('Tets for settings page', () => {

    beforeEach(async()=>{

        let user = readWriteFile.readFile();
        await HomePage.open();
        await HomePage.signinBtn.click();
        await LoginPage.login(user.email, user.password);
        await HomePage.signOutLink.waitForDisplayed();
        await HomePage.settingsLink.click();
    })

    afterEach(async () => {

        await browser.deleteAllCookies();

    });

    describe('Open settings landing page', () => {

        it('should open settings landing page', async () => {

            await expect(browser).toHaveUrl("https://realworld-djangoapp.herokuapp.com/settings/");

        });

    });

    describe('Tests for URL of profile picture', () => {

        const randomURL = Math.random().toString(36).substring(7);

        it('test with invalid URL', async () => {
            
            await SettingsPage.urlField.setValue(randomURL);
            await SettingsPage.updSettBtn.click();
            await expect(browser).toHaveUrl("https://realworld-djangoapp.herokuapp.com/settings/");

        });

        it('test if field has attribute type=url', async () => {

            const attr = await SettingsPage.urlField.getAttribute('type');
            await expect(attr).toBe('url');

        });

        it('test with valid URL', async () => {

            await SettingsPage.urlField.clearValue();
            await SettingsPage.urlField.setValue('https://realworld-djangoapp.herokuapp.com');
            await SettingsPage.updSettBtn.click();
            let src = await ProfilePage.profileImage.getAttribute('src');
            await expect(src).toBe("https://realworld-djangoapp.herokuapp.com");
            
        });
    });

    describe('Tests for Your Name field', () => {

        it('Test with blank Your name field', async () => {

            await HomePage.settingsLink.click();
            await expect(SettingsPage.yourNameField).toHaveAttribute('required');

        });

        it('Test with only spaces in Your Name field', async () => {

            await SettingsPage.yourNameField.setValue('           ');
            await SettingsPage.updSettBtn.click();
            await expect(SettingsPage.errorMessage).toHaveText('* This field is required.');

        });

        it('Test with changing your name field (happy path)', async () => {
            let randomUsername = Math.random().toString(36).substring(7);
            let user = readWriteFile.readFile();
            await HomePage.settingsLink.click();
            await SettingsPage.yourNameField.clearValue();
            await SettingsPage.yourNameField.setValue(randomUsername);
            await SettingsPage.updSettBtn.click();
            await expect(ProfilePage.userName).toHaveText(randomUsername);
            readWriteFile.writeFile(randomUsername, user.email, user.password);
        });

    });

    describe('Tests for Bio field', () => {

        it('Test with blank bio field', async () => {

            await HomePage.settingsLink.click();
            await SettingsPage.bioField.clearValue();
            await SettingsPage.bioField.setValue('');
            await SettingsPage.updSettBtn.click();
            await expect(ProfilePage.bioMessage).toHaveText('');
        });

        it('Test with text in bio field, happy path', async () => {

            await HomePage.settingsLink.click();
            await SettingsPage.bioField.clearValue();
            await SettingsPage.bioField.setValue('this is a test');
            await SettingsPage.updSettBtn.click();
            await expect(ProfilePage.bioMessage).toHaveText('this is a test');
        });

    });

    describe('Tests for Email field', () => {

        it('Test with blank Email field', async () => {

            await HomePage.settingsLink.click();
            await expect(SettingsPage.emailField).toHaveAttribute('required');

        });

        it('Test with only spaces in Email field', async () => {

            await SettingsPage.emailField.setValue('           ');
            await SettingsPage.updSettBtn.click();
            await expect(SettingsPage.emailField).toHaveAttribute('required');

        });

        it('Test with attribute type=email', async () => {

            let attr = await SettingsPage.emailField.getAttribute('type');
            await expect(attr).toBe('email');

        });

        it('Test with invalid email field', async () => {

            await SettingsPage.emailField.setValue('test@test');
            await SettingsPage.updSettBtn.click();
            await expect(SettingsPage.errorMessage).toHaveText('* Enter a valid email address.')

        });

        it('Test this email already exists', async () => {

            await SettingsPage.emailField.setValue(process.env.TEST_EMAIL);
            await SettingsPage.updSettBtn.click();
            await expect(SettingsPage.errorMessage).toHaveText('* User with this Email Address already exists.');

        });

        it('Test with changing Email (happy path)', async () => {
            let randomEmail = Math.random().toString(36).substring(7) + '@test.com';
            let user = readWriteFile.readFile();
            await SettingsPage.emailField.setValue(randomEmail);
            //await SettingsPage.passwordField.setValue(user.password);
            await SettingsPage.updSettBtn.click();
            await HomePage.settingsLink.click();
            await expect(SettingsPage.emailField).toHaveValue(randomEmail);
            readWriteFile.writeFile(user.name, randomEmail, user.password);
        });

    });

    describe('Tests for password field', () => {

        it('Test with changing password field', async () => {

            let randomPassword = Math.random().toString(36).substring(7)
            let user = readWriteFile.readFile();
            await SettingsPage.passwordField.setValue(randomPassword);
            await SettingsPage.updSettBtn.click();
            await HomePage.signinBtn.waitForDisplayed();
            await HomePage.signinBtn.click();
            await LoginPage.login(user.email, randomPassword);
            await expect(HomePage.signOutLink).toBeExisting();
            readWriteFile.writeFile(user.name, user.email, randomPassword);
        });
    });   
});
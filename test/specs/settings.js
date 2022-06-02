import HomePage from  '../pageobjects/home.page';
import SignupPage from  '../pageobjects/signup.page';
import SettingsPage from  '../pageobjects/settings.page';
import LoginPage from  '../pageobjects/login.page';

beforeEach(async()=>{
    await HomePage.open();
    await HomePage.signinBtn.click();
    await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASSWORD)
    await HomePage.signOutLink.waitForDisplayed();
    await HomePage.settingsLink.click();
})
afterEach(async () => {
    await browser.deleteAllCookies();
});
describe('Open settings landing page', () => {

    fit('should open settings landing page', async () => {

        await expect(browser).toHaveUrl("https://realworld-djangoapp.herokuapp.com/settings/");

    });

});

describe('Tests for URL of profile picture', () => {

    const randomURL = Math.random().toString(36).substring(7);

    fit('test with invalid URL', async () => {
        
        await SettingsPage.urlField.setValue(randomURL);
        await SettingsPage.updSettBtn.click();
        await expect(browser).toHaveUrl("https://realworld-djangoapp.herokuapp.com/settings/");

    });

    fit('test if field has attribute type=url', async () => {

        const attr = await SettingsPage.urlField.getAttribute('type');
        await expect(attr).toBe('url');

    });

    fit('test with valid URL', async () => {

        await SettingsPage.urlField.clearValue();
        await SettingsPage.urlField.setValue('https://realworld-djangoapp.herokuapp.com');
        await SettingsPage.updSettBtn.click();
        //await expect(browser).toHaveUrlContaining("profile");
        await expect(SettingsPage.profileImage).toHaveElementProperty('https://realworld-djangoapp.herokuapp.com');
        
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

    const randomUsername = Math.random().toString(36).substring(7);

    it('Test with changing your name field (happy path)', async () => {

        await HomePage.settingsLink.click();
        await SettingsPage.yourNameField.clearValue();
        await SettingsPage.yourNameField.setValue(randomUsername);
        await SettingsPage.updSettBtn.click();
        await expect(SettingsPage.userName).toHaveText(randomUsername);

    });

});
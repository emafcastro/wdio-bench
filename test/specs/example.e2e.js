import HomePage from  '../pageobjects/home.page';
import SignupPage from  '../pageobjects/signup.page';

describe('My Login application', () => {

    beforeEach(async () => {
        await HomePage.open();
        await HomePage.signupBtn.click();
    })

    it('Test with attribute type=email', async () => {

        const randomName = Math.random().toString(36).substring(7);
        const randomEmail = Math.random().toString(36).substring(7) + '@test.com';
        const randomPassword = Math.random().toString(36).substring(7);

        await SignupPage.signup('123456789w123456789w123456789w1234567889wttt', randomEmail, randomPassword);
        await expect(SignupPage.signoutBtn).toHaveText('Sign Out');
    });
});



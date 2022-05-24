import LoginPage from  '../pageobjects/login.page';
import HomePage from '../pageobjects/home.page'

describe('My Login application', () => {

    beforeEach(async ()=>{
        await HomePage.open();
        
        await HomePage.SigninBtn.click();
    })

    afterEach(async ()=>{
        await browser.deleteAllCookies()
    })

    /**
     * This tests allows to login with correct credentials
     */
    it('should login with valid credentials', async () => {
        

        await LoginPage.login('emanuel@test.com', 'Test1234');

        // Add element as part of home page object
        const linkSignOut = $(`/html/body/nav/div/ul/li[4]/a[contains(text(),'Sign Out')]`) // OR //a[contains(text(),'Sign Out')]
        await expect(await linkSignOut).toBeExisting();
    });

    it('should check the fields email and password are required', async() => {
        await expect(await LoginPage.inputUsername).toHaveAttr("required")
        await expect(await LoginPage.inputPassword).toHaveAttr("required")
    })
});
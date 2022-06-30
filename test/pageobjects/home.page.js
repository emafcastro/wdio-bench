import Page from "./page";

class HomePage extends Page {
    get signinBtn() {
        return $(".nav-link=Sign in");
    }

    get signupBtn() {
        return $("/html/body/nav/div/ul/li[4]/a");
    }

    get signOutLink() {
        return $(".nav-link=Sign Out");
    }

    get newArticleLink() {
        return $(`//li/a[contains(text(),'New Article')]`);
    }

    get settingsLink() {
        return $("/html/body/nav/div/ul/li[3]/a");
    }

    get usernameLink(){
        return $(".nav-link="+process.env.TEST_USERNAME);
        //return $(`.nav-link=${process.env.TEST_USERNAME}`);
    }

    get navLinks() {
        return $$(".nav-link");
    }

    open() {
        return super.open("");
    }

    async getNavLinksText() {
        let linkTextArr = [];
        await this.navLinks.forEach(async (link) => {
            linkTextArr.push(await link.getText());
        });
        return linkTextArr;
    }
}

export default new HomePage();

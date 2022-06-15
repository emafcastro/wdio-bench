import NewArticlePage from "../pageobjects/newArticle.page";
import ArticlesPage from "../pageobjects/articles.page"
import LoginPage from "../pageobjects/login.page";
import HomePage from "../pageobjects/home.page";

const title = "This article was created with Webdriverio";
const summary = "This is the summary of the article";
const content = "This is the content of the article.";
const tags = "test";

describe("New Article tests", () => {
    /**
     * Before each test, the browser will navigate until the page to create a new article
     */
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASSWORD);
        await HomePage.signOutLink.waitForDisplayed();
        await HomePage.newArticleLink.click();
    });

    afterEach(async () => {
        await browser.deleteAllCookies();
    });

    describe("New Article - Valid interactions", () => {
        /**
         * Validation against the url using toHaveUrl method
         */
        it("should check the url is correct", async () => {
            expect(browser).toHaveUrl("https://realworld-djangoapp.herokuapp.com/new/");
        });

        /**
         * Validation in the field title using toHaveAttr method
         */
        it("should check the title field is required", async () => {
            await expect(NewArticlePage.titleField).toHaveAttr("required");
        });

        /**
         * A new article is created and its content is validated
         */
        fit("should allow to add a new article", async () => {
            await NewArticlePage.addArticle(title, summary, content, tags);
            await expect(ArticlesPage.titleText).toHaveText(title);
            await expect(ArticlesPage.contentSection).toHaveTextContaining(summary);
            await expect(ArticlesPage.contentSection).toHaveTextContaining(content);
            await expect(ArticlesPage.authorLink).toHaveText(process.env.TEST_USERNAME);

            // Check that the date is today, it needs to be formatted
            const today = new Date();
            const date = today.toLocaleString("default", { year: "numeric", month: "long", day: "numeric" });
            await expect(ArticlesPage.creationDateTxt).toHaveText(date);
        });

        /**
         * A new article with title only is created and its value is validated
         */
        it("should allow to create an article with only title", async () => {
            await NewArticlePage.addArticle(title);
            await expect(ArticlesPage.titleText).toHaveText(title);
            await expect(ArticlesPage.contentSection).not.toHaveTextContaining(summary);
            await expect(ArticlesPage.contentSection).not.toHaveTextContaining(content);
        });

        /**
         * A new article with title and summary is created and its values are validated
         */
        it("should allow to create an article with title and summary", async () => {
            await NewArticlePage.addArticle(title, summary);
            await expect(ArticlesPage.titleText).toHaveText(title);
            await expect(ArticlesPage.contentSection).toHaveTextContaining(summary);
            await expect(ArticlesPage.contentSection).not.toHaveTextContaining(content);
        });

        /**
         * A new article with title, summary and content is created and its values are validated
         */
        it("should allow to create an article title, summary and content", async () => {
            await NewArticlePage.addArticle(title, summary, content);
            await expect(ArticlesPage.titleText).toHaveText(title);
            await expect(ArticlesPage.contentSection).toHaveTextContaining(summary);
            await expect(ArticlesPage.contentSection).toHaveTextContaining(content);
        });

        /**
         * Test to check that the autocomplete function works with existing tags
         */
        it("should autocomplete tags", async () => {
            await NewArticlePage.sendKeysToTagField("te");
            expect(NewArticlePage.tagSuggestion).toBeExisting();
            expect(NewArticlePage.tagSuggestion).toHaveText("test");
        });
    });

    describe("New Article - Invalid interactions", () => {
        /**
         * A new article with empty title is created and the error message is validated
         */
        it("should not allow to create an article with empty spaces on the title", async () => {
            const emptyTitle = "   ";
            await NewArticlePage.addArticle(emptyTitle);
            expect(NewArticlePage.errorMessages).toHaveText("* This field is required.");
        });

        /**
         * Test to check that the autocomplete does not return any sugestions when the tag does not exist
         */
        it("should not autocomplete tags if there are not matching tags", async () => {
            await NewArticlePage.sendKeysToTagField("sarasa");
            expect(NewArticlePage.tagSuggestion).not.toBeExisting();
        });

        it("should allow it add only 120 characters in email field", async () => {
            let chars = "abcdefghijklmnopqrstuvwxyz1234567890";
            let text = "";
            for (let ii = 0; ii < 120; ii++) {
                text += chars[Math.floor(Math.random() * chars.length)];
            }

            await NewArticlePage.titleField.setValue(text);
            await expect(NewArticlePage.titleField).toHaveValue(text);

            const newText = text + "extra";
            await NewArticlePage.titleField.setValue(newText);
            await expect(NewArticlePage.titleField).toHaveValue(text);
        });
    });
});

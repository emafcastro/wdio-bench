import Page from "./page";

class NewArticlePage extends Page {
    /**
     * define selectors using getter methods
     */
    get titleField() {
        return $("#id_title");
    }

    get summaryField() {
        return $("#id_summary");
    }

    get contentField() {
        return $("#id_content");
    }

    get tagsField() {
        return $("#id_tags");
    }

    get publishBtn() {
        return $("<button>");
    }

    get errorMessages() {
        return $(".error-messages");
    }

    get tagSuggestion() {
        return $('[title="Click to add this tag"]');
    }

    get titleText() {
        return $("div.container > h1");
    }

    get authorLink() {
        return $(".container > .article-meta > .info > a.author");
    }

    get contentSection() {
        return $(".article-content");
    }

    get creationDateTxt(){
        return $('.container > .article-meta > .info > span');
    }

    open() {
        return super.open("new/");
    }

    async addArticle(title, summary, content, tags) {
        summary = typeof summary !== 'undefined' ? summary : '';
        content = typeof content !== 'undefined' ? content : '';
        tags = typeof tags !== 'undefined' ? tags : '';

        await this.titleField.setValue(title);
        await this.summaryField.setValue(summary);
        await this.contentField.setValue(content);
        await this.tagsField.setValue(tags);
        await this.publishBtn.click();
    }

    searchInContent(text) {
        return $(`//*[contains(text(),${text})]`);
    }

    async sendKeysToTagField(text){
        await (await this.tagsField).setValue("")
        await browser.keys(text)
    }
}

export default new NewArticlePage();

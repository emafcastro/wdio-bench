import Page from "./page";

class ArticlesPage extends Page {
    get titleText() {
        return $("div.container > h1");
    }

    get authorLink() {
        return $(".container > .article-meta > .info > a.author");
    }

    get contentSection() {
        return $(".article-content");
    }

    get creationDateTxt() {
        return $(".container > .article-meta > .info > span");
    }
}

export default new ArticlesPage();

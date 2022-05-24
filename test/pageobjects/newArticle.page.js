import Page from './page';

class NewArticlePage extends Page {
  


    open () {
        return super.open('new');
    }

}

export default new NewArticlePage();
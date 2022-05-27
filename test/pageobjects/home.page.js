

import Page from './page';

class HomePage extends Page {
  
    get signinBtn() {
        return $('/html/body/nav/div/ul/li[3]/a');
    }

    get signupBtn() {
        return $('/html/body/nav/div/ul/li[4]/a');
    }

    open () {
        return super.open('');
    }

}

export default new HomePage();

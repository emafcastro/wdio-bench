import Page from './page';

class SignupPage extends Page {
  


    open () {
        return super.open('register');
    }

}

export default new SignupPage();
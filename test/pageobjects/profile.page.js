import Page from './page';

class ProfilePage extends Page {
  
    get profileImage() { return $('.user-img')};
    get bioMessage() { return $('/html/body/div/div[1]/div/div/div/p')};
    get userName() { return $('/html/body/div/div[1]/div/div/div/h4')};

    open () {
        return super.open('profile');
    }

}

export default new ProfilePage();
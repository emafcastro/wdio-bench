import Page from './page';

class SettingsPage extends Page {
  


    open () {
        return super.open('settings');
    }

}

export default new SettingsPage();
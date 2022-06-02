import Page from './page';

class SettingsPage extends Page {
  
    get urlField() { return $('//*[@id="id_image"]')}
    get updSettBtn() { return $('/html/body/div/div/div/div/form/fieldset/button')}
    get yourNameField() { return $('//*[@id="id_name"]')}
    get errorMessage() { return $('/html/body/div/div/div/div/form/form/ul')}
    get userName() { return $('/html/body/div/div[1]/div/div/div/h4')}
    get profileImage() { return $('/html/body/div/div[1]/div/div/div/img')}

    open () {
        return super.open('settings');
    }

}

export default new SettingsPage();
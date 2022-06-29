import Page from './page';

class SettingsPage extends Page {
  
    get urlField() { return $('//*[@id="id_image"]')}
    get updSettBtn() { return $('/html/body/div/div/div/div/form/fieldset/button')}
    get yourNameField() { return $('//*[@id="id_name"]')}
    get errorMessage() { return $('/html/body/div/div/div/div/form/form/ul')}
    get bioField() { return $('#id_bio')}
    get emailField() { return $('#id_email')}
    get errorMessage() { return $('.error-messages')}
    get passwordField() { return $('#id_password')}

    open () {
        return super.open('settings');
    }

}

export default new SettingsPage();
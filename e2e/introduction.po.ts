import { browser, by, element } from 'protractor';

export class IntroductionPage {
  navigateTo() {
    return browser.get('/');
  }

  getWelcomeText() {
    return element(by.css('h2')).getText();
  }
}

import { IntroductionPage } from './introduction.po';

describe('stocks-angular App', () => {
  let page: IntroductionPage;

  beforeEach(() => {
    page = new IntroductionPage();
  });

  it('should display a welcome message', () => {
    page.navigateTo();
    expect(page.getWelcomeText()).toEqual('WELCOME TO STOCKS DEMO APP');
  });
});

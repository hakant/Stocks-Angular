import { AppPage } from './app.po';

describe('stocks-angular App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display correcy brand', () => {
    page.navigateTo();
    expect(page.getBrandText()).toEqual('Stocks');
  });
});

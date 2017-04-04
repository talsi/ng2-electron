import { AppsGeneratorPage } from './app.po';

describe('apps-generator App', () => {
  let page: AppsGeneratorPage;

  beforeEach(() => {
    page = new AppsGeneratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

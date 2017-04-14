import { DGoFPage } from './app.po';

describe('dgo-f App', function() {
  let page: DGoFPage;

  beforeEach(() => {
    page = new DGoFPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

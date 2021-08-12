import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdviserComponentsPage, AdviserDeleteDialog, AdviserUpdatePage } from './adviser.page-object';

const expect = chai.expect;

describe('Adviser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adviserComponentsPage: AdviserComponentsPage;
  let adviserUpdatePage: AdviserUpdatePage;
  let adviserDeleteDialog: AdviserDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Advisers', async () => {
    await navBarPage.goToEntity('adviser');
    adviserComponentsPage = new AdviserComponentsPage();
    await browser.wait(ec.visibilityOf(adviserComponentsPage.title), 5000);
    expect(await adviserComponentsPage.getTitle()).to.eq('mybaamtuappApp.adviser.home.title');
    await browser.wait(ec.or(ec.visibilityOf(adviserComponentsPage.entities), ec.visibilityOf(adviserComponentsPage.noResult)), 1000);
  });

  it('should load create Adviser page', async () => {
    await adviserComponentsPage.clickOnCreateButton();
    adviserUpdatePage = new AdviserUpdatePage();
    expect(await adviserUpdatePage.getPageTitle()).to.eq('mybaamtuappApp.adviser.home.createOrEditLabel');
    await adviserUpdatePage.cancel();
  });

  it('should create and save Advisers', async () => {
    const nbButtonsBeforeCreate = await adviserComponentsPage.countDeleteButtons();

    await adviserComponentsPage.clickOnCreateButton();

    await promise.all([
      adviserUpdatePage.setRegistrationNumberInput('registrationNumber'),
      adviserUpdatePage.setCompanyInput('company'),
      adviserUpdatePage.setDepartmentInput('department'),
      adviserUpdatePage.userSelectLastOption(),
      adviserUpdatePage.bankSelectLastOption(),
    ]);

    await adviserUpdatePage.save();
    expect(await adviserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await adviserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Adviser', async () => {
    const nbButtonsBeforeDelete = await adviserComponentsPage.countDeleteButtons();
    await adviserComponentsPage.clickOnLastDeleteButton();

    adviserDeleteDialog = new AdviserDeleteDialog();
    expect(await adviserDeleteDialog.getDialogTitle()).to.eq('mybaamtuappApp.adviser.delete.question');
    await adviserDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(adviserComponentsPage.title), 5000);

    expect(await adviserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

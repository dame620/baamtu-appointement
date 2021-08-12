import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AppointmentComponentsPage, AppointmentDeleteDialog, AppointmentUpdatePage } from './appointment.page-object';

const expect = chai.expect;

describe('Appointment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appointmentComponentsPage: AppointmentComponentsPage;
  let appointmentUpdatePage: AppointmentUpdatePage;
  let appointmentDeleteDialog: AppointmentDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Appointments', async () => {
    await navBarPage.goToEntity('appointment');
    appointmentComponentsPage = new AppointmentComponentsPage();
    await browser.wait(ec.visibilityOf(appointmentComponentsPage.title), 5000);
    expect(await appointmentComponentsPage.getTitle()).to.eq('mybaamtuappApp.appointment.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(appointmentComponentsPage.entities), ec.visibilityOf(appointmentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Appointment page', async () => {
    await appointmentComponentsPage.clickOnCreateButton();
    appointmentUpdatePage = new AppointmentUpdatePage();
    expect(await appointmentUpdatePage.getPageTitle()).to.eq('mybaamtuappApp.appointment.home.createOrEditLabel');
    await appointmentUpdatePage.cancel();
  });

  it('should create and save Appointments', async () => {
    const nbButtonsBeforeCreate = await appointmentComponentsPage.countDeleteButtons();

    await appointmentComponentsPage.clickOnCreateButton();

    await promise.all([
      appointmentUpdatePage.setReasonInput('reason'),
      appointmentUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      appointmentUpdatePage.adviserSelectLastOption(),
      appointmentUpdatePage.managerSelectLastOption(),
    ]);

    await appointmentUpdatePage.save();
    expect(await appointmentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Appointment', async () => {
    const nbButtonsBeforeDelete = await appointmentComponentsPage.countDeleteButtons();
    await appointmentComponentsPage.clickOnLastDeleteButton();

    appointmentDeleteDialog = new AppointmentDeleteDialog();
    expect(await appointmentDeleteDialog.getDialogTitle()).to.eq('mybaamtuappApp.appointment.delete.question');
    await appointmentDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(appointmentComponentsPage.title), 5000);

    expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

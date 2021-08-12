import { element, by, ElementFinder } from 'protractor';

export class AppointmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-appointment div table .btn-danger'));
  title = element.all(by.css('jhi-appointment div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class AppointmentUpdatePage {
  pageTitle = element(by.id('jhi-appointment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  reasonInput = element(by.id('field_reason'));
  dateInput = element(by.id('field_date'));

  adviserSelect = element(by.id('field_adviser'));
  managerSelect = element(by.id('field_manager'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setReasonInput(reason: string): Promise<void> {
    await this.reasonInput.sendKeys(reason);
  }

  async getReasonInput(): Promise<string> {
    return await this.reasonInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async adviserSelectLastOption(): Promise<void> {
    await this.adviserSelect.all(by.tagName('option')).last().click();
  }

  async adviserSelectOption(option: string): Promise<void> {
    await this.adviserSelect.sendKeys(option);
  }

  getAdviserSelect(): ElementFinder {
    return this.adviserSelect;
  }

  async getAdviserSelectedOption(): Promise<string> {
    return await this.adviserSelect.element(by.css('option:checked')).getText();
  }

  async managerSelectLastOption(): Promise<void> {
    await this.managerSelect.all(by.tagName('option')).last().click();
  }

  async managerSelectOption(option: string): Promise<void> {
    await this.managerSelect.sendKeys(option);
  }

  getManagerSelect(): ElementFinder {
    return this.managerSelect;
  }

  async getManagerSelectedOption(): Promise<string> {
    return await this.managerSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AppointmentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appointment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appointment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

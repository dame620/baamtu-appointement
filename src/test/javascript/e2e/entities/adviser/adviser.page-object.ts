import { element, by, ElementFinder } from 'protractor';

export class AdviserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adviser div table .btn-danger'));
  title = element.all(by.css('jhi-adviser div h2#page-heading span')).first();
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

export class AdviserUpdatePage {
  pageTitle = element(by.id('jhi-adviser-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  registrationNumberInput = element(by.id('field_registrationNumber'));
  companyInput = element(by.id('field_company'));
  departmentInput = element(by.id('field_department'));

  userSelect = element(by.id('field_user'));
  bankSelect = element(by.id('field_bank'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setRegistrationNumberInput(registrationNumber: string): Promise<void> {
    await this.registrationNumberInput.sendKeys(registrationNumber);
  }

  async getRegistrationNumberInput(): Promise<string> {
    return await this.registrationNumberInput.getAttribute('value');
  }

  async setCompanyInput(company: string): Promise<void> {
    await this.companyInput.sendKeys(company);
  }

  async getCompanyInput(): Promise<string> {
    return await this.companyInput.getAttribute('value');
  }

  async setDepartmentInput(department: string): Promise<void> {
    await this.departmentInput.sendKeys(department);
  }

  async getDepartmentInput(): Promise<string> {
    return await this.departmentInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async bankSelectLastOption(): Promise<void> {
    await this.bankSelect.all(by.tagName('option')).last().click();
  }

  async bankSelectOption(option: string): Promise<void> {
    await this.bankSelect.sendKeys(option);
  }

  getBankSelect(): ElementFinder {
    return this.bankSelect;
  }

  async getBankSelectedOption(): Promise<string> {
    return await this.bankSelect.element(by.css('option:checked')).getText();
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

export class AdviserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adviser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adviser'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

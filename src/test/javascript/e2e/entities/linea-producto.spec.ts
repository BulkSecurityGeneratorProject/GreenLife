import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('LineaProducto e2e test', () => {

    let navBarPage: NavBarPage;
    let lineaProductoDialogPage: LineaProductoDialogPage;
    let lineaProductoComponentsPage: LineaProductoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LineaProductos', () => {
        navBarPage.goToEntity('linea-producto');
        lineaProductoComponentsPage = new LineaProductoComponentsPage();
        expect(lineaProductoComponentsPage.getTitle())
            .toMatch(/Linea Productos/);

    });

    it('should load create LineaProducto dialog', () => {
        lineaProductoComponentsPage.clickOnCreateButton();
        lineaProductoDialogPage = new LineaProductoDialogPage();
        expect(lineaProductoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Linea Producto/);
        lineaProductoDialogPage.close();
    });

    it('should create and save LineaProductos', () => {
        lineaProductoComponentsPage.clickOnCreateButton();
        lineaProductoDialogPage.setCantidadInput('5');
        expect(lineaProductoDialogPage.getCantidadInput()).toMatch('5');
        lineaProductoDialogPage.setPrecioUnitarioInput('5');
        expect(lineaProductoDialogPage.getPrecioUnitarioInput()).toMatch('5');
        lineaProductoDialogPage.productoSelectLastOption();
        lineaProductoDialogPage.save();
        expect(lineaProductoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LineaProductoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-linea-producto div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class LineaProductoDialogPage {
    modalTitle = element(by.css('h4#myLineaProductoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    cantidadInput = element(by.css('input#field_cantidad'));
    precioUnitarioInput = element(by.css('input#field_precioUnitario'));
    productoSelect = element(by.css('select#field_producto'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setCantidadInput = function(cantidad) {
        this.cantidadInput.sendKeys(cantidad);
    };

    getCantidadInput = function() {
        return this.cantidadInput.getAttribute('value');
    };

    setPrecioUnitarioInput = function(precioUnitario) {
        this.precioUnitarioInput.sendKeys(precioUnitario);
    };

    getPrecioUnitarioInput = function() {
        return this.precioUnitarioInput.getAttribute('value');
    };

    productoSelectLastOption = function() {
        this.productoSelect.all(by.tagName('option')).last().click();
    };

    productoSelectOption = function(option) {
        this.productoSelect.sendKeys(option);
    };

    getProductoSelect = function() {
        return this.productoSelect;
    };

    getProductoSelectedOption = function() {
        return this.productoSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
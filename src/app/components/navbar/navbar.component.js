"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var navbar_routes_config_1 = require('./navbar-routes.config');
var navbar_metadata_1 = require('./navbar.metadata');
var loginModal_component_1 = require('../../components/popup-modals/loginModal.component');
var index_1 = require('../../services/index');
var angular2_cool_storage_1 = require('angular2-cool-storage');
var NavbarComponent = (function () {
    //router : Router;
    function NavbarComponent(localStorage, router, renderer, accountService, commonAppService) {
        this.router = router;
        this.renderer = renderer;
        this.accountService = accountService;
        this.commonAppService = commonAppService;
        this.isCollapsed = true;
        this.users = [];
        this.localStorage = localStorage;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.menuItems = navbar_routes_config_1.ROUTES.filter(function (menuItem) { return menuItem.menuType === navbar_metadata_1.MenuType.UNAUTH; });
        this.userMenus = navbar_routes_config_1.ROUTES.filter(function (menuItem) { return menuItem.menuType === navbar_metadata_1.MenuType.AUTH; });
        this.brandMenu = navbar_routes_config_1.ROUTES.filter(function (menuItem) { return menuItem.menuType === navbar_metadata_1.MenuType.BRAND; })[0];
        this.currentUser = this.localStorage.getObject('currentUser');
        console.log(' currentUser ' + JSON.stringify(this.currentUser));
    };
    Object.defineProperty(NavbarComponent.prototype, "menuIcon", {
        get: function () {
            return this.isCollapsed ? '☰' : '✖';
        },
        enumerable: true,
        configurable: true
    });
    NavbarComponent.prototype.getMenuItemClasses = function (menuItem) {
        return {
            'pull-xs-right': this.isCollapsed && menuItem.menuType === navbar_metadata_1.MenuType.UNAUTH
        };
    };
    NavbarComponent.prototype.getUserMenuClasses = function (menuItem) {
        return {
            'pull-xs-right': this.isCollapsed && menuItem.menuType === navbar_metadata_1.MenuType.AUTH
        };
    };
    NavbarComponent.prototype.checkAuth = function (event) {
        event.stopPropagation();
        console.log(' checkAuth call1 ' + this.currentUser);
        if (this.currentUser == null) {
            this.openModal('loginModalBtn');
        }
        else {
            //this.router.navigateByUrl('/test', true);
            //this.router.navigate(['/manageProperty/' + 'new'], true);
            this.router.navigate([
                'manageProperty', { Id: 'new' }
            ]);
        }
    };
    NavbarComponent.prototype.openModal = function (ButtonId) {
        document.getElementById(ButtonId).click();
    };
    NavbarComponent.prototype.logout = function (event) {
        event.stopPropagation();
        this.localStorage.removeItem('currentUser');
        this.renderer.invokeElementMethod(this.navbarbrand.nativeElement, 'click', []);
    };
    __decorate([
        core_1.ViewChild(loginModal_component_1.LoginModalComponent), 
        __metadata('design:type', loginModal_component_1.LoginModalComponent)
    ], NavbarComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('navbarbrand'), 
        __metadata('design:type', Object)
    ], NavbarComponent.prototype, "navbarbrand", void 0);
    __decorate([
        core_1.ViewChild("Search"), 
        __metadata('design:type', core_1.ElementRef)
    ], NavbarComponent.prototype, "searchElementRef", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navbar',
            templateUrl: 'navbar.component.html',
            styleUrls: ['navbar.component.css'],
            providers: [angular2_cool_storage_1.CoolLocalStorage]
        }),
        __param(2, core_1.Inject(core_1.Renderer)), 
        __metadata('design:paramtypes', [angular2_cool_storage_1.CoolLocalStorage, router_1.Router, core_1.Renderer, index_1.AccountService, index_1.CommonAppService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map
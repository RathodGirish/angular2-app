import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject, Renderer, ElementRef } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ROUTES } from './navbar-routes.config';
import { MenuType } from './navbar.metadata';
import { User } from '../../components/models/user';
import { LoginModalComponent } from '../../components/popup-modals/loginModal.component';

import { UserService, AccountService, CommonAppService } from '../../services/index';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  moduleId: "navbarModule",
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ],
  providers: [CoolLocalStorage]
})

export class NavbarComponent implements OnInit {

  public menuItems: any[];
  public userMenus: any[];
  public brandMenu: any;
  isCollapsed = true;

  @ViewChild(LoginModalComponent)
    public readonly modal: LoginModalComponent;

  @ViewChild('navbarbrand')
   public navbarbrand: any;  

  @ViewChild("Search")
    public searchElementRef: ElementRef;

  currentUser: User;
  users: User[] = [];
  localStorage: CoolLocalStorage;
  //router : Router;

  constructor(localStorage: CoolLocalStorage, 
    public router: Router, 
    @Inject(Renderer) public renderer: Renderer, 
    public accountService: AccountService,
    public commonAppService: CommonAppService) {
    this.localStorage = localStorage;  
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem.menuType === MenuType.UNAUTH);
    this.userMenus = ROUTES.filter(menuItem => menuItem.menuType === MenuType.AUTH);
    this.brandMenu = ROUTES.filter(menuItem => menuItem.menuType === MenuType.BRAND)[0];
    this.currentUser = this.localStorage.getObject('currentUser');
    console.log(' currentUser ' + JSON.stringify(this.currentUser));
  }

  public get menuIcon(): string {
    return this.isCollapsed ? '☰' : '✖';
  }

  public getMenuItemClasses(menuItem: any) {
    return {
      'pull-xs-right': this.isCollapsed && menuItem.menuType === MenuType.UNAUTH
    };
  }

  public getUserMenuClasses(menuItem: any) {
    return {
      'pull-xs-right': this.isCollapsed && menuItem.menuType === MenuType.AUTH
    };
  }

  checkAuth(event: any){
    event.stopPropagation();
    console.log(' checkAuth call1 ' + this.currentUser);  
    if(this.currentUser == null){
      this.openModal('loginModalBtn');
    } else {
      //this.router.navigateByUrl('/test', true);
      //this.router.navigate(['/manageProperty/' + 'new'], true);
      this.router.navigate( [
        'manageProperty', { Id: 'new'}
      ]);
    }
  }

  openModal(ButtonId: string){
    document.getElementById(ButtonId).click();
  }

  logout(event: any){
    event.stopPropagation();
    this.localStorage.removeItem('currentUser');
    this.renderer.invokeElementMethod(this.navbarbrand.nativeElement, 'click', []);
  }
}

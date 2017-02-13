import { NgModule, Component }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { EqualValidator } from './components/forms/equal-validator.directive';

import { AccountService, UserService, PropertyService, ProfileService, CommonAppService, UploadPictureService } from './services/index';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginModalComponent }  from './components/popup-modals/loginModal.component';
import { RegistrationModalComponent }  from './components/popup-modals/registrationModal.component';
import { UserComponent }  from './components/user/user.component';
import { ProfileComponent }  from './components/profile/profile.component';
import { MyRentalsComponent }  from './components/myrentals/myrentals.component';
import { HomeComponent }  from './components/home/home.component';
import { AboutComponent }  from './components/about/about.component';
import { ContactComponent }  from './components/contact/contact.component';
import { NavbarComponent }  from './components/navbar/navbar.component';
import { ManagePropertyComponent }  from './components/property/manageProperty.component';
import { PropertyDetailsComponent }  from './components/property/propertyDetails.component';

import { MapComponent }  from './components/map/map.component';

import { Slide }  from './components/custom/slider/slide.component';
import { Carousel }  from './components/custom/slider/carousel.component';
import { Multiselect, FilterPipe } from './components/custom/multiselect/multiselect.component';

import { AgmCoreModule } from "angular2-google-maps/core";

import { routing }  from './app.routing';

@NgModule({
  declarations: [
    AppComponent, 
    EqualValidator,
    NavbarComponent, 
    LoginModalComponent,
    RegistrationModalComponent,
    HomeComponent, 
    ProfileComponent, 
    MyRentalsComponent,
    UserComponent, 
    AboutComponent, 
    ContactComponent, 
    ManagePropertyComponent,
    PropertyDetailsComponent,
    MapComponent,
    Carousel,
    Slide,
    Multiselect,
    FilterPipe
  ],
  imports: [ 
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBuwOohTTSPG0fe2jsNyWQtmx7ivPz6dmA",
      libraries: ["places"]
    }),
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpModule, 
    routing 
  ],
  providers: [
    AuthComponent,
    AccountService,
    UserService,    
    PropertyService,
    ProfileService,
    CommonAppService,  
    UploadPictureService,  
    CoolLocalStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

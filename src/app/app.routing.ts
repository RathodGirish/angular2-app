import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {MapComponent }  from './components/map/map.component';
import {ProfileComponent} from './components/profile/profile.component';
import {MyRentalsComponent}  from './components/myrentals/myrentals.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {ManagePropertyComponent} from './components/property/manageProperty.component';
import {PropertyDetailsComponent} from './components/property/propertyDetails.component';

import { AuthComponent } from './components/auth/auth.component';

const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthComponent]
	},
	{
		path: 'myrentals',
		component: MyRentalsComponent,
		canActivate: [AuthComponent]
	},
	{
		path: 'manageProperty',
		component: ManagePropertyComponent,
		canActivate: [AuthComponent]
	},
	{
		path: 'propertyDetails',
		component: PropertyDetailsComponent
	},
	{ 	path: '**', 
		redirectTo: '' 
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


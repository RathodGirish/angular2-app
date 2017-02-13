"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./components/home/home.component');
var profile_component_1 = require('./components/profile/profile.component');
var myrentals_component_1 = require('./components/myrentals/myrentals.component');
var about_component_1 = require('./components/about/about.component');
var contact_component_1 = require('./components/contact/contact.component');
var manageProperty_component_1 = require('./components/property/manageProperty.component');
var propertyDetails_component_1 = require('./components/property/propertyDetails.component');
var auth_component_1 = require('./components/auth/auth.component');
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent
    },
    {
        path: 'contact',
        component: contact_component_1.ContactComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        canActivate: [auth_component_1.AuthComponent]
    },
    {
        path: 'myrentals',
        component: myrentals_component_1.MyRentalsComponent,
        canActivate: [auth_component_1.AuthComponent]
    },
    {
        path: 'manageProperty',
        component: manageProperty_component_1.ManagePropertyComponent,
        canActivate: [auth_component_1.AuthComponent]
    },
    {
        path: 'propertyDetails',
        component: propertyDetails_component_1.PropertyDetailsComponent
    },
    { path: '**',
        redirectTo: ''
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
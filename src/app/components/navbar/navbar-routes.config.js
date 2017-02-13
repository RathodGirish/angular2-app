"use strict";
var navbar_metadata_1 = require('./navbar.metadata');
exports.ROUTES = [
    { path: '', title: 'Maprentals', menuType: navbar_metadata_1.MenuType.BRAND },
    { path: 'contact', title: 'Contact', menuType: navbar_metadata_1.MenuType.UNAUTH },
    { path: 'about', title: 'About Us', menuType: navbar_metadata_1.MenuType.UNAUTH },
    { path: 'profile', title: 'My Profile', menuType: navbar_metadata_1.MenuType.AUTH },
    { path: 'myrentals', title: 'My Rentals', menuType: navbar_metadata_1.MenuType.AUTH }
];
//# sourceMappingURL=navbar-routes.config.js.map
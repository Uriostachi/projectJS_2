import app from './app.js';

import config from './config.js';

import Home from '../src/controllers/Home.js';
import Add from '../src/controllers/Add.js';
import Manage from '../src/controllers/Manage.js'

// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter() {
    // Instancier ici le Vanilla Router dans l'objet "app.mvc.router"
    // ...
    app.mvc.router = new Router({
        mode: 'hash',
        root: '/index.html'
    });

    app.mvc.router.add('/', () => {
        let HomeController = new Home();
        HomeController.show();
    });

    app.mvc.router.add('/add', () => {
        let AddController = new Add();
        AddController.show();
    });

    app.mvc.router.add('/edit', () => {
        let ManageController = new Add();
        ManageController.showList();
    });

    app.mvc.router.check().addUriListener();
}


// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Initialisation du routeur.
    initializeRouter();
    
});
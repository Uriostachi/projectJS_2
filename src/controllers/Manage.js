import app from '../../app/app.js'

export default class Manage {
    show() {
        app.mvc.loadView('manage');
    }
}
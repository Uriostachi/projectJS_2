import app from '../../app/app.js';
import Question from '../models/Question.js'

export default class Home {
    show() {
        app.mvc.loadView('home')
            .then(() => new Question().getThemes())
        ;
    }

    
}
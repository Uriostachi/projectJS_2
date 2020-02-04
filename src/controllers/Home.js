import app from '../../app/app.js';
import Question from '../models/Question.js'

export default class Home {
    show() {
        app.mvc.loadView('home')
            .then(() => this.addTheme())
        ;
    }

    addTheme() {
        let themesSelect = document.querySelector('select.theme');
        let themes = (new Question).getThemes();
        let themesSingle = [...new Set(themes)];
        
        themesSingle.forEach(theme => {
            let option = document.createElement("option");
            option.text = theme;
            option.value = theme;
            themesSelect.append(option);
        });


        themesSelect.addEventListener('change', e => this.getNumberof(e))

    }

    getNumberof(event) {
        let number = themes.reduce((acc, current) => acc + (current == event.target.value ? 1 : 0), 0)
        this.addQuestionNumber(number)
    }

    addQuestionNumber(value) {
        let numberSelect = document.querySelector('select.questionsNumber');

        for(let i = 1; i <= value; i++) {
            numberSelect.innerHTML = "";
            let option = document.createElement("option");
            option.text = i;
            option.value = i;
            numberSelect.append(option);
        }

    }
}
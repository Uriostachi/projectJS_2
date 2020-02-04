import app from '../../app/app.js';

import Question from '../models/question.js'

export default class Add {
    show() {
        app.mvc.loadView('add').then(() => this.fetchQuestionForm()).then(() => this.addQuestion());
    }

    async fetchQuestionForm() {
        return await fetch('src/views/components/question.html')
            .then(response => response.text())
            .then(response => document.querySelector('div.form').insertAdjacentHTML('beforeend', response))
        ;
    }

    addQuestion() {

        let button = document.querySelector('button.addQuestion');
        let questionModel = new Question();

        button.addEventListener('click', e => {
            let inputs = document.querySelectorAll('input');
            let question = {};

            inputs.forEach(input => {
                if(input.type == 'text' && input.name.slice(0, 6) == 'answer') {
                    question[input.name] = {'text': input.value};
                } else if(input.type == 'text') {
                    question[input.name] = input.value;
                } else if(input.type == 'radio' && input.checked == true) {
                    question[input.name.slice(0, 7)]['truthness'] = input.value;
                }
            })
            questionModel.insert(question);
            document.querySelector('form').reset();
        });
    }

    showList() {
        app.mvc.loadView('questionsList').then(() => this.myEventsListener()).then(() => this.listThemes());
    }

    listThemes() {
        let themesSelect = document.querySelector('select.theme');

        let themes = (new Question).getThemes();
        let themesSingle = [...new Set(themes)];
        
        themesSingle.forEach(theme => {
            let option = document.createElement("option");
            option.text = theme;
            option.value = theme;
            themesSelect.append(option);
        });
    }

    listTitles(event) {
        let questions = (new Question).getQuestions();
        let titleSelect = document.querySelector('select.title');
        titleSelect.innerHTML = "";
        questions.forEach(question => {
            if(event.target.value == question['theme'] || event.target.value == 'all') {
                let option = document.createElement("option");
                option.text = question['title'];
                option.value = questions.indexOf(question) + 1;
                titleSelect.append(option);  
            }
        });
    }

    fillForm(e) {
        let question = (new Question).getOneQuestion(e.target.value);
        console.log(question);
        document.getElementsByName('title').value = question['title'];
        document.getElementsByName('theme').value = question['theme'];

        console.log(document.getElementsByName('title'));
        console.log(document.getElementsByName('theme'));
        //document.getElementByName().value = ;
        //document.getElementByName().value = ;
        //document.getElementByName().value = ;
        //document.getElementByName().value = ;
        //document.getElementByName().value = ;
    }

    myEventsListener() {
        let themesSelect = document.querySelector('select.theme');
        themesSelect.addEventListener('change', e => this.listTitles(e))

        let titleSelect = document.querySelector('select.title');
        titleSelect.addEventListener('change', e => {
            document.querySelector('div.form').innerHTML = "";
            this.fetchQuestionForm().then(this.fillForm(e));
        });
    }
}
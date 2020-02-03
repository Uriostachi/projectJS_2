import app from '../../app/app.js';

import Question from '../models/question.js'

export default class Add {
    show() {
        app.mvc.loadView('add').then(() => this.addQuestion());
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
}
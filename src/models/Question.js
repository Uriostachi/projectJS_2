export default class  Question {
    insert(obj) {
        window.localStorage.setItem(window.localStorage.length + 1, JSON.stringify(obj));
    }

    getOneQuestion(index) {
        return JSON.parse(window.localStorage.getItem(index));
    }

    getQuestions() {
        let questions = []
        for(let i = 1; i <= window.localStorage.length; i++) {
            questions.push(JSON.parse(window.localStorage.getItem(i)));
        }
        return questions
    }

    getThemes() {
        let questions = this.getQuestions();
        let themes = []
        questions.forEach(question => {
            themes.push(question['theme']);
        });
        return themes;
    }


}
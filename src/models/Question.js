export default class  Question {
    insert(obj) {
        window.localStorage.setItem(window.localStorage.length + 1, JSON.stringify(obj));
    }

    getThemes() {
        
    }
}
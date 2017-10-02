import { observable, action, computed } from "mobx";



class observableListStore {
    @observable count = 10;
    @observable menuCamera = "Camera,Action"
    @observable names = [
        'Simon Mignolet',
        'Nathaniel Clyne',
        'Dejan Lovren',
        'Mama Sakho',
        'Alberto Moreno',
        'Emre Can',
        'Joe Allen',
        'Phil Coutinho',
    ]

    @action.bound
    increment() {
        this.count += 1;
    }

    @action
    decrement() {
        this.count -= 1;
    }

    @computed get fullName() {
        return `${this.names[0]} ${this.count}`;
    }
}

const ObservableListStore = new observableListStore()
export default ObservableListStore
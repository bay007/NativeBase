'use strict';

import { observable, action, computed } from "mobx";


class users {
    @observable usersList = []

    @action
    setUserList(userList) {
        this.usersList = userList
    }
}

const UsersStore = new users()
export default UsersStore
'use strict';

import { observable, action, computed } from "mobx";


class login {
    @observable email = "tnt_Code@hotmail.com";
    @observable password = "Axa2010*A";
    @observable isLoading = false
    @observable responseMessage = "-"
    @observable isLoged = false

    @action
    setIsLogued(state) {
        this.isLoged = state
    }

    @action
    setEmail(email) {
        this.email = email
    }

    @action
    setLoading(estado) {
        this.isLoading = estado
    }

    @action
    setPassword(password) {
        this.password = password
    }

    @action
    setResponseMessage(text) {
        this.responseMessage = text
    }

}

const Login = new login()
export default Login
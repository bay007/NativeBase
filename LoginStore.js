'use strict';

import { observable, action, computed } from "mobx";

class login {
    @observable email = "";
    @observable password = "";
    @observable isLoading = false
    @observable responseMessage = "-"

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
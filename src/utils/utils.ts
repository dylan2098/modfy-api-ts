'use strict'

import moment from "moment";
import randomstring from "randomstring";
import _ from 'lodash';

const now = () => {
    return moment().format("DD/MM/YYYY HH:mm:ss");
}

const defaultNow = () => {
    return moment().format();
}

const randomStr = () => {
    return randomstring.generate(process.env.GEN_SALT);
}

const regexEmail = (email: string) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

const regexPhone = (phone: string) => {
    const regex = /^[+-]?\d+(?:\s*\d+)*$/;
    return regex.test(phone);
}

const environment = () => {
    if(_.has(process.env, 'NODE_ENV')) {
        return process.env.NODE_ENV ?? '';
    }

    return 'development';
}

export default {
    now,
    defaultNow,
    randomStr,
    regexEmail,
    regexPhone,
    environment
}
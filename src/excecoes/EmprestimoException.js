"use strict";

module.exports = class EmprestimoException extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmprestimoException';
    }
};
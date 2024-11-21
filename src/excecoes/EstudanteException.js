"use strict";

module.exports = class EstudanteException extends Error {
    constructor(message) {
        super(message);
        this.name = 'EstudanteException';
    }
};
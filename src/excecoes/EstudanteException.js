"use strict";

module.exports = class EstudanteException extends Error {
    constructor(message) {
        super(message); // Chama o construtor da classe base (Error)
        this.name = 'EstudanteException';
    }
};
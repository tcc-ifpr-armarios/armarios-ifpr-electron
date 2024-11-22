"use strict";

module.exports = class CursoException extends Error {
    constructor(message) {
        super(message); // Chama o construtor da classe base (Error)
        this.name = 'CursoException';
    }
};
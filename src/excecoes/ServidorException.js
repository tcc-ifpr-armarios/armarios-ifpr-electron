"use strict";

module.exports = class ServidorException extends Error {
    constructor(message) {
        super(message); // Chama o construtor da classe base (Error)
        this.name = 'ServidorException';
    }
};
"use strict";

module.exports = class LocalizacaoException extends Error {
    constructor(message) {
        super(message); // Chama o construtor da classe base (Error)
        this.name = 'LocalizacaoException';
    }
};
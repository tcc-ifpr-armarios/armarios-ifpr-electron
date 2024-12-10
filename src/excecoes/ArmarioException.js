"use strict";

module.exports = class ArmarioException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ArmarioException';
    }
};
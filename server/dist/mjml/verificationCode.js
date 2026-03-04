"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerificationEmailTemplate = void 0;
const mjml_1 = __importDefault(require("mjml"));
const fs_1 = require("fs");
const path_1 = require("path");
const emailTemplate = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "./verificationCode.mjml"), {
    encoding: "utf-8",
});
const getVerificationEmailTemplate = (code, to) => {
    let template = emailTemplate
        .replace("{{ code }}", code);
    let result = (0, mjml_1.default)(template);
    return result.html;
};
exports.getVerificationEmailTemplate = getVerificationEmailTemplate;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_entity_1 = require("../entities/user.entity");
const dotenv_1 = require("dotenv");
const bcryptjs_1 = require("bcryptjs");
const email_queue_1 = require("../bullmq/queues/email.queue");
const roles_enum_1 = require("../enums/roles.enum");
const gender_enum_1 = require("../enums/gender.enum");
const typedi_1 = require("typedi");
const jsonwebtoken_1 = require("jsonwebtoken");
const queue_redis_1 = require("../redis/queue.redis");
const getRepo_1 = require("../utils/getRepo");
(0, dotenv_1.config)();
const { ACCESS_TOKEN_SECRET, ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
let AuthService = class AuthService {
    constructor() {
        this.userRepo = (0, getRepo_1.getRepo)(user_entity_1.User);
    }
    async register(input) {
        const existing = await this.userRepo.findOne({
            where: { email: input.email },
        });
        if (existing)
            throw new Error("Email is already used");
        if (input.confirmPassword !== input.password)
            throw new Error("Passwords do not match");
        const hashedPassword = await (0, bcryptjs_1.hash)(input.password, 10);
        const user = this.userRepo.create({
            username: input.username,
            email: input.email,
            password: hashedPassword,
            gender: input.gender,
        });
        return await this.userRepo.save(user);
    }
    async login(input) {
        const user = await this.userRepo.findOne({ where: { email: input.email } });
        if (!user)
            throw new Error("Invalid email");
        const isValid = await (0, bcryptjs_1.compare)(input.password, user.password);
        if (!isValid)
            throw new Error("Invalid password");
        const payload = {
            id: user.id,
            role: user.role,
        };
        const accessToken = (0, jsonwebtoken_1.sign)(payload, `${ACCESS_TOKEN_SECRET}`, {
            expiresIn: "1h",
        });
        return {
            token: accessToken,
            ...payload
        };
    }
    async forgotPassword(email) {
        await email_queue_1.emailQueue.add("send-verification-code", {
            email,
        }, {
            attempts: 5,
            backoff: { type: "exponential", delay: 5000 },
        });
        return `Verification code sent to ${email}`;
    }
    async verifyCode(code) {
        const email = await queue_redis_1.queueRedis.get(code);
        if (!email)
            throw new Error("Verification code expired or not found");
        await queue_redis_1.queueRedis.del(code);
        return email;
    }
    async resetPassword(email, newPassword, confirmPassword) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user)
            throw new Error("User not found");
        if (newPassword !== confirmPassword)
            throw new Error("Passwords do not match");
        const hashedPassword = await (0, bcryptjs_1.hash)(newPassword, 10);
        user.password = hashedPassword;
        await this.userRepo.save(user);
        return true;
    }
    async seedAdmin() {
        const admin = await this.userRepo.findOne({ where: { role: roles_enum_1.Roles.ADMIN } });
        if (admin)
            throw new Error("Admin is already exist");
        const newAdmin = this.userRepo.create({
            username: `${ADMIN_USERNAME}`,
            email: `${ADMIN_EMAIL}`,
            password: `${ADMIN_PASSWORD}`,
            role: roles_enum_1.Roles.ADMIN,
            gender: gender_enum_1.Gender.MALE,
        });
        await this.userRepo.save(newAdmin);
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, typedi_1.Service)()
], AuthService);

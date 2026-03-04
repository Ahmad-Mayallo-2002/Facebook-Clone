"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const typedi_1 = require("typedi");
const getRepo_1 = require("../utils/getRepo");
const notification_entity_1 = require("../entities/notification.entity");
const paginationCalculation_1 = require("../utils/paginationCalculation");
const notification_queue_1 = require("../bullmq/queues/notification.queue");
let NotificationService = class NotificationService {
    constructor() {
        this.notificationRepo = (0, getRepo_1.getRepo)(notification_entity_1.Notification);
    }
    async createNotification(input, senderId) {
        const notification = this.notificationRepo.create({
            ...input,
            sender: { id: senderId },
            receiver: { id: input.receiverId },
            senderId,
            receiverId: input.receiverId,
        });
        return await this.notificationRepo.save(notification);
    }
    async getNotifications(take, skip) {
        const [data, counts] = await this.notificationRepo.findAndCount({
            take,
            skip,
        });
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        if (!data.length)
            throw new Error("No Notifications Found");
        return { data: data, pagination };
    }
    async getById(id) {
        const notification = await this.notificationRepo.findOne({ where: { id } });
        if (!notification)
            throw new Error("No Notification Found");
        return notification;
    }
    async getReceiverNotifications(receiverId, take, skip) {
        const [data, counts] = await this.notificationRepo.findAndCount({
            where: { receiverId },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!data.length)
            throw new Error("No Notifications found");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data, pagination };
    }
    async deleteNotification(id) {
        const notification = await this.getById(id);
        await this.notificationRepo.remove(notification);
        return true;
    }
    async dispatch(event, payload) {
        await notification_queue_1.notificationQueue.add("notification-job", {
            event,
            payload,
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, typedi_1.Service)()
], NotificationService);

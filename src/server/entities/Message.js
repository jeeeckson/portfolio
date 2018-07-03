"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var User_1 = require("./User");
var _a = require("typeorm"), Entity = _a.Entity, PrimaryGeneratedColumn = _a.PrimaryGeneratedColumn, Column = _a.Column, CreateDateColumn = _a.CreateDateColumn, JoinColumn = _a.JoinColumn, ManyToOne = _a.ManyToOne;
/**
 * Represents a dates that might perform a event.
 */
var Message = /** @class */ (function () {
    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param sender {User} Name of the user sender, cannot be null.
     * @param receiver {User} Name of the user receiver, cannot be null.
     * @param message {string} message, cannot be null.
     */
    function Message(sender, receiver, message) {
        if (!arguments.length) {
            return;
        }
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
    }
    __decorate([
        PrimaryGeneratedColumn()
    ], Message.prototype, "id");
    __decorate([
        ManyToOne(function (type) { return User_1.User; }),
        Column("int", { name: 'user_id', nullable: false }),
        JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    ], Message.prototype, "sender");
    __decorate([
        ManyToOne(function (type) { return User_1.User; }),
        Column("int", { name: 'user_id', nullable: false }),
        JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    ], Message.prototype, "receiver");
    __decorate([
        CreateDateColumn()
    ], Message.prototype, "createDate");
    __decorate([
        Column("text", { nullable: false })
    ], Message.prototype, "message");
    Message = __decorate([
        Entity("messages")
    ], Message);
    return Message;
}());
exports.Message = Message;

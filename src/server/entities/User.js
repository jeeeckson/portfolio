"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var _a = require("typeorm"), Entity = _a.Entity, PrimaryGeneratedColumn = _a.PrimaryGeneratedColumn, Column = _a.Column;
/**
 * Represents a User that might be use the application can be an admin
 * with more privileges or a simple user.
 */
var User = /** @class */ (function () {
    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param username {string}   name of the user, cannot be null.
     * @param password {string}  password of the user, cannot be null.
     * @param name {string}   name of the user, cannot be null.
     * @param lastName {string}   name of the user, cannot be null.
     * @param admin {boolean}  specify if is admin or user, cannot be null.
     */
    function User(username, password, name, lastName, admin) {
        if (!arguments.length) {
            return;
        }
        this.friends = [];
        this.username = username;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.admin = admin ? 1 : 0;
    }
    __decorate([
        PrimaryGeneratedColumn()
    ], User.prototype, "id");
    __decorate([
        Column("text")
    ], User.prototype, "username");
    __decorate([
        Column("text")
    ], User.prototype, "password");
    __decorate([
        Column("int")
    ], User.prototype, "admin");
    __decorate([
        Column("text", { nullable: true })
    ], User.prototype, "name");
    __decorate([
        Column("text", { nullable: true })
    ], User.prototype, "lastName");
    __decorate([
        Column("int", { nullable: true })
    ], User.prototype, "age");
    __decorate([
        Column("text", { nullable: true })
    ], User.prototype, "route");
    __decorate([
        Column("text", { nullable: true })
    ], User.prototype, "number");
    __decorate([
        Column("text", { nullable: true })
    ], User.prototype, "state");
    __decorate([
        Column("text", { nullable: true })
    ], User.prototype, "city");
    __decorate([
        Column("simple-array", { nullable: true })
    ], User.prototype, "friends");
    User = __decorate([
        Entity("users")
    ], User);
    return User;
}());
exports.User = User;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
/**
 * Represents a User that might be use the application can be an admin
 * with more privileges or a simple user.
 */
let User = class User {
    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param username {string}   name of the user, cannot be null.
     * @param password {string}  password of the user, cannot be null.
     * @param admin {boolean}  specify if is admin or user, cannot be null.
     */
    constructor(username, password, admin) {
        if (!arguments.length) {
            return;
        }
        this.username = username;
        this.password = password;
        this.admin = admin ? 1 : 0;
    }
};
__decorate([
    typeorm_1.PrimaryColumn("int"),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], User.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "route", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "number", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], User.prototype, "state", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], User.prototype, "city", void 0);
User = __decorate([
    typeorm_1.Entity("users"),
    __metadata("design:paramtypes", [String, String, Boolean])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map
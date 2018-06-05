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
const User_1 = require("./User");
/**
 * Represents a User that might be use the application can be an admin
 * with more privileges or a simple user.
 */
let Address = class Address {
    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param user {User} The user, cannot be null.
     * @param route {string} Route of the user, cannot be null.
     * @param number {int} Route of the user, cannot be null.
     * @param state {string} Route of the user, cannot be null.
     * @param city {string} Route of the user, cannot be null.
     */
    constructor(user, route, number, state, city) {
        if (!arguments.length) {
            return;
        }
        this.user = user;
        this.route = route;
        this.number = number;
        this.state = state;
        this.city = city;
    }
};
__decorate([
    typeorm_1.ManyToOne(type => User_1.User),
    typeorm_1.PrimaryColumn("int", { name: 'user_id' }),
    typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.User)
], Address.prototype, "user", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Address.prototype, "route", void 0);
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Address.prototype, "number", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
Address = __decorate([
    typeorm_1.Entity("users"),
    __metadata("design:paramtypes", [User_1.User, String, Number, String, String])
], Address);
exports.Address = Address;
//# sourceMappingURL=Address.js.map
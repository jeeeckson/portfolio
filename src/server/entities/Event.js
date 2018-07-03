"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var User_1 = require("./User");
var _a = require("typeorm"), Entity = _a.Entity, PrimaryColumn = _a.PrimaryColumn, Column = _a.Column, CreateDateColumn = _a.CreateDateColumn, JoinColumn = _a.JoinColumn, ManyToOne = _a.ManyToOne;
//const User = require('./User');
/**
 * Represents a dates that might perform a event.
 */
var Event = /** @class */ (function () {
    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param owner {User} Name of the user owner, cannot be null.
     * @param createDate {Date} Date create of the user, cannot be null.
     * @param eventDate {Date} Date event of the event, cannot be null.
     * @param location {string} location of the event, cannot be null.
     * @param description {string} description of the event, cannot be null.
     */
    function Event(owner, createDate, eventDate, location, description) {
        if (!arguments.length) {
            return;
        }
        this.owner = owner;
        this.createDate = createDate;
        this.eventDate = eventDate;
        this.location = location;
        this.description = description;
    }
    __decorate([
        PrimaryColumn("int")
    ], Event.prototype, "id");
    __decorate([
        ManyToOne(function (type) { return User_1.User; }),
        Column("int", { name: 'user_id', nullable: false }),
        JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    ], Event.prototype, "owner");
    __decorate([
        CreateDateColumn()
    ], Event.prototype, "createDate");
    __decorate([
        Column('datetime', { name: "event_date" })
    ], Event.prototype, "eventDate");
    __decorate([
        Column("text", { nullable: false })
    ], Event.prototype, "location");
    __decorate([
        Column("text", { nullable: false })
    ], Event.prototype, "description");
    Event = __decorate([
        Entity("events")
    ], Event);
    return Event;
}());
exports.Event = Event;

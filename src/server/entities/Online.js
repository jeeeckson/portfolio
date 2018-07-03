"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var _a = require("typeorm"), Entity = _a.Entity, PrimaryColumn = _a.PrimaryColumn, Column = _a.Column;
/**
 * Represents a dates that might perform a event.
 */
var Online = /** @class */ (function () {
    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param handle {string} cannot be null.
     * @param connection_id {string} cannot be null.
     */
    function Online(handle, connection_id) {
        if (!arguments.length) {
            return;
        }
        this.handle = handle;
        this.connection_id = connection_id;
    }
    __decorate([
        PrimaryColumn("int")
    ], Online.prototype, "id");
    __decorate([
        Column("text", { nullable: false })
    ], Online.prototype, "handle");
    __decorate([
        Column("text", { nullable: false })
    ], Online.prototype, "connection_id");
    Online = __decorate([
        Entity("onlines")
    ], Online);
    return Online;
}());
exports.Online = Online;

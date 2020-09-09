"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.appService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var appService = /** @class */ (function () {
    function appService(http) {
        this.http = http;
        this.url = "http://dev.nuevoerp.co:8017/api/";
    }
    appService.prototype.obtenerDatos = function (token) {
        var headers = new http_1.HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded'
        });
        return this.http.post(this.url + "facelectro/getSingle/" + token, { headers: headers });
    };
    appService.prototype.actualizarAcuse = function (id, data) {
        var headers = new http_1.HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded'
        });
        return this.http.post(this.url + "facelectro/updateSingle/" + id, "json=" + JSON.stringify(data), { headers: headers });
    };
    appService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], appService);
    return appService;
}());
exports.appService = appService;

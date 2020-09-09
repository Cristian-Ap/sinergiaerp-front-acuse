"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var moment = require("moment");
var AppComponent = /** @class */ (function () {
    function AppComponent(rutaActiva, AppService) {
        this.rutaActiva = rutaActiva;
        this.AppService = AppService;
        this.loading = true;
        this.title = 'Sistema de información Sihos';
        this.empresa = "Sinergia";
        this.tipo = "Factura de Venta";
        this.documento = "ACMUNPT666000";
        this.envio = "10-08-2020";
        this.total = "$ 10.000,00";
        this.estado = [{ name: 'Aceptada' }, { name: 'Rechazada' }];
        this.errormessage = "No hay conexion con la base de datos";
        this.succesmessage = "Acuse enviado con exito";
        this.stateSend = true;
        this.stateSuccess = false;
        this.stateFail = false;
        this.data = {};
        this.invalidAcuse = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.token == '' || _this.token == undefined) {
                _this.stateFail = true;
                _this.loading = false;
                _this.errormessage = "Token de auntenticación no encontrado";
            }
        }, 5000);
        this.formatFecha();
        this.rutaActiva.queryParams.subscribe(function (params) {
            _this.token = params['token'];
            _this.AppService.obtenerDatos(_this.token).subscribe(function (data) {
                if (data != "") {
                    _this.id = data[0].id;
                    _this.empresa = data[0].empresa;
                    _this.tipo = data[0].tipo_comprobante;
                    _this.documento = data[0].documento;
                    _this.envio = data[0].fecha_envio;
                    _this.total = data[0].total;
                    _this.estadoAcuse = data[0].estado_acuse;
                    _this.loading = false;
                    if (_this.estadoAcuse != "pendiente_acuse") {
                        _this.invalidAcuse = true;
                    }
                }
            });
        });
    };
    AppComponent.prototype.formatFecha = function () {
        this.fecha = moment().format('l');
    };
    AppComponent.prototype.enviar = function () {
        var _this = this;
        if (this.estadoSelected == '' || this.estadoSelected == undefined) {
            alert('Escoja un estado del acuse, por favor.');
            return;
        }
        if (this.comentario == '' || this.comentario == undefined) {
            alert('Escriba un comentario, por favor.');
            return;
        }
        this.data = {
            estado_acuse: this.estadoSelected,
            comentario_acuse: this.comentario
        };
        this.AppService.actualizarAcuse(this.id, this.data).subscribe(function (data) {
            if (data == 1) {
                _this.stateSuccess = true;
            }
            else {
                _this.errormessage = "error al actualizar el acuse";
                _this.stateFail = true;
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

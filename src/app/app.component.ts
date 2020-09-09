import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { appService } from './app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public loading = true;

  public title = 'Sistema de información Sihos';
  public fecha: any;
  public empresa = "Sinergia";
  public tipo = "Factura de Venta";
  public documento = "ACMUNPT666000";
  public total = "$ 10.000,00";
  public estado = [{id: 42551, name: 'Aceptada'}, {id: 42552, name: 'Rechazada'}];

  public errormessage = "No hay conexion con la base de datos";
  public succesmessage = "Acuse enviado con exito"

  public stateSend = true;
  public stateSuccess = false;
  public stateFail = false;

  public estadoSelected;
  public comentario;
  public token;
  private id;
  private data = {};
  private estadoAcuse;
  public invalidAcuse = false;

  constructor(
    private rutaActiva: ActivatedRoute,
    private AppService: appService
  ){}

  ngOnInit(): void {
    setTimeout(()=>{
      if(this.token == '' || this.token == undefined){
        this.stateFail = true;
        this.loading = false;
        this.errormessage = "Token de auntenticación no encontrado"
      }
    },5000)
    this.rutaActiva.queryParams.subscribe(params => {
      this.token = params['token'];
      this.AppService.obtenerDatos(this.token).subscribe((data) =>{
        if(data != "" ){
          this.id = data[0].id
          this.empresa = data[0].empresa
          this.tipo = data[0].tipo_comprobante
          this.documento = data[0].documento
          this.total = this.formatearNumero(data[0].total,',','.',2,true)
          this.estadoAcuse = data[0].estado_acuse
          this.loading = false
          this.fecha = this.formatFecha(data[0].fecha_acuse)
          if(this.estadoAcuse != 42550){
            this.invalidAcuse = true
          }
        }
      })
    });
  }

  formatFecha(date){
    moment.locale('es') //idioma
    return moment(date).format("LL") //tipo de formato
  }

  formatearNumero(num, sepDecimal, separador, cantDecimales, peso = true) {
    if (!isNaN(num)) {
        num += '';
        const splitStr = num.split('.');
        let splitLeft = splitStr[0];
        const splitRight = splitStr.length > 1 ? sepDecimal + splitStr[1].slice(0, cantDecimales) : '';
        const regx = /(\d+)(\d{3})/;

        //Aplicar reemplazo cuando exista un caracter. Si se envia vacio este genera un bucle infinito.
        if (separador != null && separador.trim().length > 0) {
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + separador + '$2');
            }
        }

        if (peso) {
            return '$ ' + splitLeft + splitRight;
        } else {
            return splitLeft + splitRight;
        }
    }
    return '';
}

  enviar(){
    if(this.estadoSelected == '' || this.estadoSelected == undefined){
      alert('Escoja un estado del acuse, por favor.')
      return
    }
    if(this.comentario == '' || this.comentario == undefined){
      alert('Escriba un comentario, por favor.')
      return
    }
    this.data = {
      estado_acuse: this.estadoSelected,
      comentario_acuse: this.comentario
    }
    this.AppService.actualizarAcuse(this.id, this.data).subscribe((data)=>{
      if( data == 1){
        this.stateSuccess = true
      }else{
        this.errormessage = "error al actualizar el acuse"
        this.stateFail = true
      }
    })
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { File } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {

  proyecto: string = '';
  cliente: string = '';
  tipohormigon: string = '';
  numeromuestra?: number;
  volumen?: number;
  nhp?: number;

  marca?: number;
  abs?: number;
  lote?: number;
  pesoseco?: number;
  pesosecobatch?: number;
  humedad?: number;
  agua?: number;
  pesohumedo?: number;

  constructor(
    private fileService: FileService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const file = new File(this.proyecto, this.cliente, this.tipohormigon, this.numeromuestra!, this.volumen!, this.nhp!,
      this.marca!, this.abs!, this.lote!, this.pesoseco!, this.pesosecobatch!, this.humedad!, this.agua!, this.pesohumedo!);
    this.fileService.save(file)
      .subscribe(
        (response: File) => {
          this.toastr.success('Ficha Creado', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          console.log(`Ficha creada  ${response}`);
          this.router.navigate(['/lista']);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          console.error(err);
        }
      )
  }
}

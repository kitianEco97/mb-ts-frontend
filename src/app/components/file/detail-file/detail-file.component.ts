import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { File } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-detail-file',
  templateUrl: './detail-file.component.html',
  styleUrls: ['./detail-file.component.css']
})
export class DetailFileComponent implements OnInit {

  file?: any;
  public loading?: boolean;

  constructor(
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.fileService.detail(id).subscribe(
      (response: File) => {
        this.file = response;
        console.log(response);
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.error(err);
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/lista']);
  }

  generatePDF() {
    const doc = new jsPDF();
    doc.text(`Proyecto: ${this.file.proyecto}`, 15, 15);
    doc.text(`Cliente: ${this.file.cliente}`, 130, 15);

    doc.text(`Tipo de hormigón: ${this.file.tipohormigon}`, 15, 30);
    doc.text(`Numero de muestra: ${this.file.numeromuestra}`, 130, 30);

    doc.text(`Volumen: ${this.file.volumen}`, 15, 45);
    doc.text(`NHP: ${this.file.nhp}`, 130, 45);

    doc.text(`Diseño`, 15, 60);

    doc.text(`Marca: ${this.file.marca}`, 15, 75);
    doc.text(`Abs: ${this.file.abs}`, 130, 75);
    
    doc.text(`Pesoseco: ${this.file.pesoseco}`, 15, 90);
    doc.text(`Lote: ${this.file.lote}`, 130, 90);

    doc.text(`Pesosecobatch: ${this.file.pesosecobatch}`, 130, 105);
    doc.text(`Humedad: ${this.file.humedad}`, 15, 105);
    
    doc.text(`Agua: ${this.file.agua}`, 130, 115);
    doc.text(`Pesohumedo: ${this.file.pesohumedo}`, 15, 115);

    doc.save(`Ficha n°_${this.file.id}`);
  }
}

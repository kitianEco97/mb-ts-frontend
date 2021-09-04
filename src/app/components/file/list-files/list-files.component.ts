import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { File } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {

  files?: File[] = [];
  isAdmin?: boolean | null; 
  public loading?: boolean;

  constructor(
    private fileService: FileService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.getAll();
    this.isAdmin = this.tokenService.isAdmin();
  }

  getAll() {
    this.fileService.list()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.files = response;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          console.error(err);
        }
      )
  }

  cargarFichas() {
    this.fileService.list()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.files = response;
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      )
  }

  borrar(id: number | undefined) {
    this.loading = true;
    Swal.fire({
            title: 'Estas seguro que deseas eliminar esta ficha?',
            text: "Se eliminara permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminala!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileService.delete(id!)
        .subscribe(
          (response: any) => {  
            this.loading = true;  
            this.toastr.success('Ficha Eliminada', 'OK', {
              timeOut: 3000,
              positionClass: 'toast-top-center'
            });
            console.log(`Eliminando ficha ${id}`)      
            this.cargarFichas();
            console.log(response);
            this.loading = false;  
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(error.error.mensaje, 'Fail', {
              timeOut: 3000,
              positionClass: 'toast-top-center'
            });
            console.error(error);
          }
        )       
      }
    })
    this.loading = false;
  }
}

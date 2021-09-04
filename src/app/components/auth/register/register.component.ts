import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  nuevoUsuario?: NuevoUsuario;
  nombre?: any;
  nombreUsuario: any;
  email?: any;
  password?: string;
  errMsj?: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password!);
    this.authService.nuevo(this.nuevoUsuario) 
      .subscribe(
        response => {       
          this.toastr.success('Cuenta Creada', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });

          this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.errMsj = err.error.mensaje;
          console.log(this.errMsj);
        }
      )
  }

}
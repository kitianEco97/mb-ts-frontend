import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdGuardService } from './guards/prod-guard.service';
import { LoginGuard } from './guards/login.guard';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreateFileComponent } from './components/file/create-file/create-file.component';
import { DetailFileComponent } from './components/file/detail-file/detail-file.component';
import { ListFilesComponent } from './components/file/list-files/list-files.component';
import { UpdateFileComponent } from './components/file/update-file/update-file.component';
import { IndexComponent } from './components/index/index.component';
import { SendEmailComponent } from './components/changepassword/send-email/send-email.component';
import { ChangePasswordComponent } from './components/changepassword/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [LoginGuard] 
  },
  { 
    path: 'registro',
    component: RegisterComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'sendemail',
    component: SendEmailComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'change-password/:tokenPassword',
    component: ChangePasswordComponent,
    canActivate: [LoginGuard]
  },
  { 
    path: 'lista', 
    component: ListFilesComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'user'] }
  },

  { 
    path: 'detail/:id', 
    component: DetailFileComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'user'] }
  },
  { 
    path: 'create', 
    component: CreateFileComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin'] }
  },
  { 
    path: 'update/:id',
    component: UpdateFileComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin'] }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

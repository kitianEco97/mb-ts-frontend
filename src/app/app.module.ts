import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { interceptorProvider } from './interceptors/prod-interceptor.service';

import { AppComponent } from './app.component';
import { ListFilesComponent } from './components/file/list-files/list-files.component';
import { CreateFileComponent } from './components/file/create-file/create-file.component';
import { DetailFileComponent } from './components/file/detail-file/detail-file.component';
import { UpdateFileComponent } from './components/file/update-file/update-file.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SendEmailComponent } from './components/changepassword/send-email/send-email.component';
import { ChangePasswordComponent } from './components/changepassword/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ListFilesComponent,
    CreateFileComponent,
    DetailFileComponent,
    UpdateFileComponent,
    HeaderComponent,
    LoginComponent,
    IndexComponent,
    RegisterComponent,
    SendEmailComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

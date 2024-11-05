import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MessagesPageComponent } from './components/messages-page/messages-page.component';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { UserUpdateInfosComponent } from './components/user-update-infos/user-update-infos.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { StorageService } from './services/storage.service';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'main-page', component: MainPageComponent, },
  {path: 'user-main-page/:username', component: UserMainPageComponent, },
  {path: 'login/callback', component: OktaCallbackComponent  },
  {path: 'messages', component: MessagesPageComponent },
  {path: 'liveChat', component: LiveChatComponent },
  {path: 'login', component: LoginFormComponent },
  {path: 'user-update-infos', component: UserUpdateInfosComponent, },
  {path: 'register', component: RegistrationFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

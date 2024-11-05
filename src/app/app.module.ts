import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { SearchbarComponent } from './components/header/searchbar/searchbar.component';
import { HeaderComponent } from './components/header/header.component';
import { CreatePostPanelComponent } from './components/main-page/create-post-panel/create-post-panel.component';
import { FilterPostComponent } from './components/main-page/filter-post/filter-post.component';
import { SidePanelComponent } from './components/main-page/side-panel/side-panel.component';
import { PostCommentPanelComponent } from './components/main-page/post/post-comment-panel/post-comment-panel.component';
import { PostComponent } from './components/main-page/post/post.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { InfoPanelComponent } from './components/messages-page/info-panel/info-panel.component';
import { MessagesHistoryPanelComponent } from './components/messages-page/messages-history-panel/messages-history-panel.component';
import { MessagesPageComponent } from './components/messages-page/messages-page.component';
import { UserMainPanelComponent } from './components/user-main-page/user-main-panel/user-main-panel.component';
import { UserSidePanelComponent } from './components/user-main-page/user-side-panel/user-side-panel.component';
import { UserUpdateInfosComponent } from './components/user-update-infos/user-update-infos.component';
import { FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import {OktaAuth} from '@okta/okta-auth-js'
import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular'
import { Router } from '@angular/router';
import { ChatComponent } from './components/user-main-page/chat/chat.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { SearchResultsOverlayComponent } from './components/header/searchbar/search-results-overlay/search-results-overlay.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';


const oktaAuth = new OktaAuth({
  issuer: "https://dev-05348811.okta.com/oauth2/default",
  clientId: "0oak6qku41XHb20ud5d7",
  redirectUri: "http://localhost:4200/login/callback",
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  // postLogoutRedirectUri: window.location.origin + "/login"
});

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchbarComponent,
    HeaderComponent,
    CreatePostPanelComponent,
    FilterPostComponent,
    PostCommentPanelComponent,
    PostComponent,
    SidePanelComponent,
    MainPageComponent,
    InfoPanelComponent,
    MessagesHistoryPanelComponent,
    MessagesPageComponent,
    UserMainPageComponent,
    UserMainPanelComponent,
    UserUpdateInfosComponent,
    UserSidePanelComponent,
    ChatComponent,
    ChatComponent,
    LiveChatComponent,
    SearchResultsOverlayComponent,
    LoginFormComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    OktaAuthModule,
    OverlayModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(),
    { 
      provide: OKTA_CONFIG, 
      useFactory: () => {
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
          
              // Redirect the user to your custom login page
              const router = injector.get(Router);
              router.navigate(['/login']);
            
 
          }  
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

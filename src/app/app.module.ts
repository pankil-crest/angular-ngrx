import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule ,} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([])
        // StoreModule.forRoot(reducers, {
        //   metaReducers,
        // }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

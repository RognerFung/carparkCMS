import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';


import { HttpMsgService } from './_services/http-msg.service';
import { HttpService } from './_services/http.service';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { BottomSheet } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        AppComponent,
        CustomerComponent,
        LoginComponent,
        HomeComponent,
        HeaderComponent,
        BottomSheet
    ],
    entryComponents: [BottomSheet],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        CdkTableModule,

        BrowserAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatExpansionModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatCardModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatGridListModule,
        MatSortModule,
        MatBottomSheetModule,
        MatDialogModule
    ],
    providers: [
        HttpService,
        HttpMsgService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

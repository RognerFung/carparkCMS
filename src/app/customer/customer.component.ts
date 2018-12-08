import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material';
import { allFields, customerTiles } from '../_shared/customer';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    customerTiles: any[] = customerTiles;
    allFields: any[] = allFields;
    fields: string[] = allFields.filter(e => e.select).map(e => e.field);
    columns: string[] = ['Select'].concat(this.fields);
    dataSource: any;
    sort: Sort = {
        active: 'ClientID',
        direction: 'asc'
    };
    page: any = {
        previousPageIndex: 0,
        pageIndex: 0,
        pageSize: 25,
        length: null,
        pageSizeOptions: [10, 25, 50, 100, 200, 500, 1000]
    };
    selectClient: any[] = [];
    showDetail: boolean = false;
    showEdit: boolean = false;
    showAdd: boolean = false;
    err: string = null;

    constructor(
        private httpService: HttpService,
        private bottomSheet: MatBottomSheet,
        private router: Router
    ) { }

    ngOnInit() {
        this.getCustomers();
    }

    getCustomers = function () {
        this.httpService.get('admin/customers/list?orderBy=' + this.sort.active + '&direction=' + this.sort.direction 
                            + '&offset=' + this.page.pageIndex*this.page.pageSize + '&limit=' + this.page.pageSize)
        .subscribe(data => {
            console.log(data);
            this.dataSource = data.clients;
            this.dataSource.forEach(e => {
                e.DateJoin = new Date(e.DateJoin).toLocaleString();
                e.AddedDate = new Date(e.AddedDate).toLocaleString();
                e.ModifiedDate = new Date(e.ModifiedDate).toLocaleString();
                e.StatusDate = new Date(e.StatusDate).toLocaleString();
            });
            this.page.length = data.count;
        }, error => {
            this.httpService.handleError(error);
            this.err = error;
            setTimeout(() => this.err = null, 3000);
        });
    }

    fieldChange() {
        this.fields = allFields.filter(e => e.select).map(e => e.field);
        this.columns = ['Select'].concat(this.fields);
    }

    pageChange(event) {
        this.page.pageIndex = event.pageIndex;
        this.page.pageSize = event.pageSize;
        this.page.previousPageIndex = event.previousPageIndex;
        this.getCustomers();
    }

    sortChange(event) {
        this.sort.active = event.active;
        this.sort.direction = event.direction;
        this.getCustomers();
    }

    selectCustomer () {
        this.showDetail = false;
        this.showEdit = false;
        this.showAdd = false;
        if (this.dataSource.filter(e => e.select).length === 0) {
            this.err = 'Please select a customer';
            setTimeout(() => this.err = null, 3000);
        } else {
            this.showDetail = true;
            this.customerTiles.map(e => e.value = this.dataSource.filter(e => e.select)[0][e.label]);
            window.scrollTo(0, 0);
        }
    }

    addCustomer () {
        this.dataSource.filter(e => e.select).map(e => e.select = false);
        this.showDetail = true;
        this.showEdit = true;
        this.showAdd = true;
        this.customerTiles.map(e => e.value = null);
        window.scrollTo(0, 0);
    }
    editCustomer () {
        this.showDetail = false;
        this.showEdit = false;
        this.showAdd = false;
        if (this.dataSource.filter(e => e.select).length === 0) {
            this.err = 'Please select a customer';
            setTimeout(() => this.err = null, 3000);
        } else {
            this.showDetail = true;
            this.showEdit = true;
            this.customerTiles.map(e => e.value = this.dataSource.filter(e => e.select)[0][e.label]);
            window.scrollTo(0, 0);
        }
    }

    deleteCustomer () {
        this.showDetail = false;
        this.showEdit = false;
        this.showAdd = false;
        if (this.dataSource.filter(e => e.select).length === 0) {
            this.err = 'Please select customers';
            setTimeout(() => this.err = null, 3000);
        } else {
            let bottomSheetRef = this.bottomSheet.open(BottomSheet, {
                data: this.dataSource.filter(e => e.select)
            });
            bottomSheetRef.afterDismissed()
            .subscribe(confirm => {
                if (confirm) {
                    this.httpService.post('admin/customers/delete', {ClientID: this.dataSource.filter(e => e.select).map(e => e.ClientID)})
                    .subscribe(data => {
                        this.err = data.message ? data.message : data;
                        setTimeout(() => this.err = null, 3000);
                        this.getCustomers();
                        this.closeDetail();
                    }, error => {
                        this.httpService.handleError(error);
                        this.err = error;
                        setTimeout(() => this.err = null, 3000);
                    });
                }
            });
        }
    }

    closeDetail () {
        this.dataSource.filter(e => e.select).map(e => e.select = false);
        this.showDetail = false;
        this.showEdit = false;
        this.showAdd = false;
    }

    editDetail () {
        this.showEdit = true;
    }

    resetDetail () {
        if (this.showAdd) {
            this.customerTiles.map(e => e.value = null);
        } else {
            this.customerTiles.map(e => e.value = this.dataSource.filter(e => e.select)[0][e.label]);
        }
    }
    submitDetail () {
        let changeData = {};
        if (this.showAdd) {
            this.customerTiles.forEach(tile => {
                changeData[tile.label] = tile.value;
            });
            this.httpService.post('admin/customers/add', changeData)
            .subscribe(data => {
                this.err = data.message ? data.message : data;
                setTimeout(() => this.err = null, 3000);
                this.dataSource.filter(e => e.select).map(e => e.select = false);
                this.closeDetail();
            }, error => {
                this.httpService.handleError(error);
                this.err = error;
                setTimeout(() => this.err = null, 3000);
            });
            this.closeDetail();
        } else {
            this.customerTiles.forEach(tile => {
                if (this.dataSource.filter(e => e.select)[0][tile.label] != tile.value) {
                    this.dataSource.filter(e => e.select)[0][tile.label] = tile.value;
                    changeData[tile.label] = tile.value;
                }
            });
            this.httpService.post('admin/customers/detail/' + this.dataSource.filter(e => e.select)[0].ClientID, changeData)
            .subscribe(data => {
                this.err = data.message ? data.message : data;
                setTimeout(() => this.err = null, 3000);
                this.dataSource.filter(e => e.select).map(e => e.select = false);
                this.closeDetail();
            }, error => {
                this.httpService.handleError(error);
                this.err = error;
                setTimeout(() => this.err = null, 3000);
            });
        }
        this.getCustomers();
    }

}

@Component({
    selector: 'bottom-sheet',
    templateUrl: 'bottom-sheet.html',
    styleUrls: ['./customer.component.css']
})
export class BottomSheet {

    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheet>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) { }

    confirm () {
        this.bottomSheetRef.dismiss(true);
        event.preventDefault();
    }

    closeSheet () {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

}
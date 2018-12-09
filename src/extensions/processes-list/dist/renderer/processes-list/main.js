(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/renderer/$$_lazy_route_resource lazy recursive":
/*!*******************************************************************!*\
  !*** ./src/renderer/$$_lazy_route_resource lazy namespace object ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/renderer/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/renderer/app/extension.module.ts":
/*!**********************************************!*\
  !*** ./src/renderer/app/extension.module.ts ***!
  \**********************************************/
/*! exports provided: ExtensionModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtensionModule", function() { return ExtensionModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _processes_list_processes_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processes-list/processes-list.component */ "./src/renderer/app/processes-list/processes-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import { FlexLayoutModule } from '@angular/flex-layout'
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
// import { NgxDatatableModule } from '@swimlane/ngx-datatable'
// import { SharedModule } from 'app/shared/shared.module'

var ExtensionModule = /** @class */ (function () {
    function ExtensionModule() {
    }
    ExtensionModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            ],
            declarations: [_processes_list_processes_list_component__WEBPACK_IMPORTED_MODULE_2__["ProcessesListComponent"]]
        })
    ], ExtensionModule);
    return ExtensionModule;
}());



/***/ }),

/***/ "./src/renderer/app/processes-list/processes-list.component.html":
/*!***********************************************************************!*\
  !*** ./src/renderer/app/processes-list/processes-list.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\" fxLayout=\"column\" fxFlexFill>\n  <!-- <div class=\"card-header\" style=\"padding: 0.35rem 0.60rem; -webkit-app-region: drag;\">\n    Processes\n    <div class=\"float-right\" style=\"-webkit-app-region: no-drag; -webkit-user-select: none; user-select: none;\">\n      <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n      <i class=\"fa fa-refresh\" aria-hidden=\"true\" (click)=\"onRefreshIconClick($event)\"></i>\n      <i class=\"fa fa-cog\" aria-hidden=\"true\"></i>\n      <i class=\"fa fa-times\" aria-hidden=\"true\" (click)=\"onCloseIconClick($event)\"></i>\n    </div>\n    <i class=\"fa fa-times close\" aria-hidden=\"true\"></i>\n  </div> -->\n  <div class=\"input-group input-group-sm\" fxFlex=\"0 1 auto\">\n    <input type=\"text\" class=\"form-control\"\n      placeholder=\"Filter...\" aria-label=\"Filter...\"\n      (keypress)=\"onSearchKeypress($event)\"\n      (keydown)=\"onSearchKeydown($event)\"\n      (keyup)=\"onSearchKeyup($event)\">\n    <span class=\"input-group-addon\">\n      <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\n    </span>\n  </div>\n\n  <!-- <ngx-datatable\n    fxFlex fxFlexFill\n    class=\"bootstrap\"\n    [rows]=\"nodes\"\n    [columnMode]=\"'flex'\"\n    [headerHeight]=\"30\"\n    [footerHeight]=\"0\"\n    [rowHeight]=\"30\"\n    [scrollbarV]=\"true\"\n    [scrollbarH]=\"true\"\n    (activate)=\"onTableRowActivate($event)\">\n    <ngx-datatable-column name=\"hWnd\" [flexGrow]=\"1\"></ngx-datatable-column>\n    <ngx-datatable-column name=\"title\" [flexGrow]=\"3\"></ngx-datatable-column>\n  </ngx-datatable> -->\n\n  <div class=\"card-footer text-muted\" style=\"padding: 0.35rem 0.60rem\" fxFlex=\"0 1 auto\">\n    <!-- Count: {{nodes.length}} -->\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/renderer/app/processes-list/processes-list.component.scss":
/*!***********************************************************************!*\
  !*** ./src/renderer/app/processes-list/processes-list.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvcmVuZGVyZXIvYXBwL3Byb2Nlc3Nlcy1saXN0L3Byb2Nlc3Nlcy1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/renderer/app/processes-list/processes-list.component.ts":
/*!*********************************************************************!*\
  !*** ./src/renderer/app/processes-list/processes-list.component.ts ***!
  \*********************************************************************/
/*! exports provided: ProcessesListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessesListComponent", function() { return ProcessesListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { ElectronService } from 'app/providers/electron.service'
// import { IpcData, IpcDataType, IpcAction, IpcEvent } from 'shared/ipc'
// import { WinApiTypes } from 'core/utilities/win-api-utils'
// import { Process } from 'models/process'
// import { ActivatedRoute } from '@angular/router'
// import { WindowUrls } from 'core/windows-manager-utils'
var ProcessesListComponent = /** @class */ (function () {
    function ProcessesListComponent(ref) {
        this.ref = ref;
        this.nodesOriginal = [];
        this.nodes = [];
    }
    ProcessesListComponent.prototype.ngOnInit = function () {
        this._registerIpcEvents();
        // this.electronService.ipcClient.send(IpcAction.GetOpenWindows)
    };
    ProcessesListComponent.prototype.ngOnDestroy = function () { };
    ProcessesListComponent.prototype._registerIpcEvents = function () {
        // this.electronService.ipcClient.listen(IpcAction.GetOpenWindows, async (ipcEvent: IpcEvent) => {
        //   // console.log('IpcAction.GetOpenWindows', ipcEvent)
        //   const windows = ipcEvent.data.data.windows
        //   this.nodes = windows
        //   this.nodesOriginal = windows
        //   this.ref.detectChanges()
        // })
    };
    ProcessesListComponent.prototype.onSearchKeypress = function (event) {
        // console.log('onSearchKeypress')
        // console.log(event)
    };
    ProcessesListComponent.prototype.onSearchKeydown = function (event) {
        // console.log('onSearchKeydown', this.searchInputValue)
        // console.log(event)
    };
    ProcessesListComponent.prototype.onSearchKeyup = function (event) {
        // console.log('onSearchKeydown', this.searchInputValue)
        // console.log(event)
        // this.nodes = this.nodesOriginal.filter(node => node.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
    };
    ProcessesListComponent.prototype.onTableRowActivate = function (event) {
        // if (event.type === 'click') {
        //   // console.log('Clicked', event)
        //   // this.electronService.ipcClient.send(IpcAction.WindowSelect, {
        //   //   hWnd: event.row.hWnd
        //   // })
        //   this.electronService.triggerAction('window-settings:open-window', {
        //     hWnd: event.row.hWnd
        //   })
        // }
    };
    ProcessesListComponent.prototype.onRefreshIconClick = function (event) {
        // this.electronService.refreshProcesses()
        // this.electronService.ipcClient.send(IpcAction.GetOpenWindows)
    };
    ProcessesListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-processes-list',
            template: __webpack_require__(/*! ./processes-list.component.html */ "./src/renderer/app/processes-list/processes-list.component.html"),
            styles: [__webpack_require__(/*! ./processes-list.component.scss */ "./src/renderer/app/processes-list/processes-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], ProcessesListComponent);
    return ProcessesListComponent;
}());



/***/ }),

/***/ "./src/renderer/environments/environment.ts":
/*!**************************************************!*\
  !*** ./src/renderer/environments/environment.ts ***!
  \**************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/renderer/main.ts":
/*!******************************!*\
  !*** ./src/renderer/main.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_extension_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/extension.module */ "./src/renderer/app/extension.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/renderer/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_extension_module__WEBPACK_IMPORTED_MODULE_2__["ExtensionModule"]);


/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./src/renderer/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Git\mb-win-mngr\src\extensions\processes-list\src\renderer\main.ts */"./src/renderer/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
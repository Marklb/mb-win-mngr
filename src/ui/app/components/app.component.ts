import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Process } from '@win-mngr/core/models/process'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private sub: any
  private procSettingsVisible: boolean
  private selectedProcess: Process

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // this.sub = this.route
    //   .queryParams
    //   .subscribe(params => {
    //     // Defaults to 0 if no query param provided.
    //     // this.page = +params['page'] || 0;
    //     console.log(params)
    //     console.log(params['page'])
    //     const page = +params['page'] || 0
    //     console.log('page', page)
    //     // if (page > 0) {
    //     //   this.router.navigate(['main'])
    //     // }

    //     // this.router.navigate(['debug-panel'])
    //   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // nextPage() {
  //   this.router.navigate(['product-list'], { queryParams: { page: this.page + 1 } });
  // }

  onClickProcess(event: any) {
    console.log('onClickProcess', event)
    this.selectedProcess = event.row
    this.procSettingsVisible = true
  }
}

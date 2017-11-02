import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  hideAlertArea = false
  hideFixedSidebar = false

  nodes: any[] = [
    { label: 'Node 1' },
    {
        label: 'Node 2',
        expandable: true,
        expanded: true,
        children: [
          { label: 'Node 1' },
          { label: 'Node 2' },
          {
            label: 'Node 3',
            expanded: false,
            expandable: true,
            children: [
              { label: 'Node 1' },
              { label: 'Node 2' },
              { label: 'Node 3' },
              { label: 'Node 4' }
            ]
          },
          {
            label: 'Node 4',
            expandable: true,
            expanded: true,
            children: [
              { label: 'Node 1' },
              { label: 'Node 2' },
              { label: 'Node 3' },
              { label: 'Node 4' }
            ]
          }
        ]
    },
    { label: 'Node 3' },
    {
      label: 'Node 4',
      children: [
        { label: 'Node 1' },
        { label: 'Node 2' },
        { label: 'Node 3' },
        { label: 'Node 4' }
      ],
      expandable: true
    }
  ]

}

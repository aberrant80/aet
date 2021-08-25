import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'aet-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
}

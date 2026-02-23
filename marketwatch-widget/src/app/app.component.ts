import { Component } from '@angular/core';
import { MarketwatchComponent } from './marketwatch/marketwatch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MarketwatchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marketwatch-widget';
}

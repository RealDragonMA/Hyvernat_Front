import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subpage',
  standalone: true,
  imports: [],
  templateUrl: './subpage.component.html',
  styles: ``
})
export class SubpageComponent {

    @Input() public title: string = '';
    @Input() public subtitle: string = '';

}

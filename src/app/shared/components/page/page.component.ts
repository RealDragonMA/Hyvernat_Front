import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [],
    templateUrl: './page.component.html',
    styles: ``,
})
export class PageComponent {
    @Input() public title: string = '';
    @Input() public subtitle: string = '';
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-administration',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [RouterOutlet],
})
export class HomeComponent implements OnInit {
    constructor() {}

    public async ngOnInit(): Promise<void> {}
}

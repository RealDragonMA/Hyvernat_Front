import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/inputs/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubpageComponent } from '../../../shared/components/subpage/subpage.component';
import { DiplomaService } from '../../../core/services/diploma.service';

@Component({
    selector: 'app-rsa-keys',
    standalone: true,
    imports: [ButtonComponent, InputComponent, ReactiveFormsModule, SubpageComponent],
    templateUrl: './rsa-keys.component.html',
    styles: ``,
})
export class RsaKeysComponent {

    constructor(protected utils: DiplomaService) {

    }

}

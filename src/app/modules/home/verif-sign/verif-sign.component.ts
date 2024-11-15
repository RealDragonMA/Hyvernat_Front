import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/inputs/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubpageComponent } from '../../../shared/components/subpage/subpage.component';
import { FormUtilitiesService } from '../../../shared/components/inputs/services/form.service';
import { DiplomaService } from '../../../core/services/diploma.service';
import { notyf } from '../../../core/utils/notyf';

@Component({
    selector: 'app-verif-sign',
    standalone: true,
    imports: [ButtonComponent, InputComponent, ReactiveFormsModule, SubpageComponent],
    templateUrl: './verif-sign.component.html',
    styles: ``,
})
export class VerifSignComponent {

    protected verifForm: FormGroup = new FormGroup({
        signature: new FormControl(null, [Validators.required]),
        public_key: new FormControl(null, [Validators.required]),
        file: new FormControl(null, [Validators.required]),
    });

    constructor(protected f: FormUtilitiesService, protected diplomaService: DiplomaService) {
    }

    protected async verifSign(): Promise<void> {
        if (this.verifForm.valid) {
            const formData = new FormData();
            formData.append('signature', this.verifForm.value.signature);
            formData.append('public_key', this.verifForm.value.public_key);
            formData.append('file', this.verifForm.value.file);

            try {
                await this.diplomaService.createDiploma(formData);
                notyf.success('Diplôme créé avec succès !');
            } catch (error) {
                notyf.error('Une erreur est survenue lors de la création du diplôme.');
            }
        } else {
            notyf.error('Veuillez remplir tous les champs');
        }
    }

    protected onImagePicked(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files && input.files.length > 0) {
            const file = input.files[0];
            this.verifForm.patchValue({ file: file });
        }
    }

    protected onPublicKeyPicked(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files && input.files.length > 0) {
            const file = input.files[0];
            this.verifForm.patchValue({ public_key: file });
        }
    }

    protected onSignaturePicked(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files && input.files.length > 0) {
            const file = input.files[0];
            this.verifForm.patchValue({ signature: file });
        }
    }
}

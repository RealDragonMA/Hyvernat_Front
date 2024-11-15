import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/inputs/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubpageComponent } from '../../../shared/components/subpage/subpage.component';
import { FormUtilitiesService } from '../../../shared/components/inputs/services/form.service';
import { DiplomaService } from '../../../core/services/diploma.service';
import { notyf } from '../../../core/utils/notyf';

@Component({
    selector: 'app-file-sign',
    standalone: true,
    imports: [ButtonComponent, InputComponent, ReactiveFormsModule, SubpageComponent],
    templateUrl: './file-sign.component.html',
    styles: ``,
})
export class FileSignComponent {

    protected signForm: FormGroup = new FormGroup({
        passphrase: new FormControl('', [Validators.required, Validators.minLength(12)]),
        private_key: new FormControl(null, [Validators.required]),
        file: new FormControl(null, [Validators.required]),
    });

    constructor(protected f: FormUtilitiesService, protected diplomaService: DiplomaService) {}

    protected async signFile(): Promise<void> {
        if (this.signForm.valid) {
            const formData = new FormData();
            formData.append('passphrase', this.signForm.value.passphrase);
            formData.append('private_key', this.signForm.value.private_key);
            formData.append('file', this.signForm.value.file);

            try {
                await this.diplomaService.signFile(formData);
                notyf.success('Fichier signé avec succès !');
            } catch (error) {
                notyf.error('Une erreur est survenue lors de la signature du diplôme.');
            }
        } else {
            notyf.error('Veuillez remplir tous les champs !');
        }
    }

    protected onImagePicked(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files && input.files.length > 0) {
            const file = input.files[0];
            this.signForm.patchValue({ file: file });
        }
    }

    protected onPrivateKeyPicked(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files && input.files.length > 0) {
            const file = input.files[0];
            this.signForm.patchValue({ private_key: file });
        }
    }

}

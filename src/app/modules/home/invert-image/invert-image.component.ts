import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/inputs/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubpageComponent } from '../../../shared/components/subpage/subpage.component';
import { FormUtilitiesService } from '../../../shared/components/inputs/services/form.service';
import { DiplomaService } from '../../../core/services/diploma.service';
import { notyf } from '../../../core/utils/notyf';

@Component({
    selector: 'app-invert-image',
    standalone: true,
    imports: [ButtonComponent, InputComponent, ReactiveFormsModule, SubpageComponent],
    templateUrl: './invert-image.component.html',
    styles: ``,
})
export class InvertImageComponent {

    protected invertForm: FormGroup = new FormGroup({
        file: new FormControl(null, [Validators.required]),
    });

    constructor(protected f: FormUtilitiesService, protected diplomaService: DiplomaService) {}

    protected async invertFile(): Promise<void> {
        if (this.invertForm.valid) {
            const formData = new FormData();
            formData.append('image', this.invertForm.value.file);

            try {
                await this.diplomaService.invertImage(formData);
                notyf.success('Fichier inversé avec succès !');
            } catch (error) {
                notyf.error('Une erreur est survenue lors de la création du diplôme.');
            }
        } else {
            notyf.error('Veuillez remplir tous les champs !');
        }
    }

    protected onImagePicked(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files && input.files.length > 0) {
            const file = input.files[0];
            this.invertForm.patchValue({ file: file });
        }
    }

}

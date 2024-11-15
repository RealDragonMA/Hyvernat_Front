import { Component } from '@angular/core';
import { PageComponent } from '../../../shared/components/page/page.component';
import { SubpageComponent } from '../../../shared/components/subpage/subpage.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/inputs/input/input.component';
import { FormUtilitiesService } from '../../../shared/components/inputs/services/form.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { notyf } from '../../../core/utils/notyf';
import { DiplomaService } from '../../../core/services/diploma.service';
import { AsyncButtonComponent } from '../../../shared/components/async-button/async-button.component';

@Component({
    selector: 'app-create-diploma',
    standalone: true,
    imports: [PageComponent, SubpageComponent, ReactiveFormsModule, InputComponent, ButtonComponent, AsyncButtonComponent],
    templateUrl: './create-diploma.component.html',
    styles: ``,
})
export class CreateDiplomaComponent {
    protected diplomaForm: FormGroup = new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        grade: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        classes: new FormControl('', [Validators.required]),
        file: new FormControl(null, [Validators.required]),
    });

    constructor(protected f: FormUtilitiesService, protected diplomaService: DiplomaService) {}

    protected async createDiploma(): Promise<void> {
        if (this.diplomaForm.valid) {
            const formData = new FormData();
            formData.append('firstname', this.diplomaForm.value.firstname);
            formData.append('lastname', this.diplomaForm.value.lastname);
            formData.append('grade', this.diplomaForm.value.grade);
            formData.append('date', this.diplomaForm.value.date);
            formData.append('classes', this.diplomaForm.value.classes);
            formData.append('file', this.diplomaForm.value.file);

            try {
                await this.diplomaService.createDiploma(formData);
                notyf.success('Diplôme créé avec succès !');
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
            this.diplomaForm.patchValue({ file: file });
        }
    }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-async-button',
    standalone: true,
    imports: [ButtonComponent, NgIf],
    templateUrl: './async-button.component.html',
    styles: ``,
})
export class AsyncButtonComponent {
    @Input() buttonText: string = 'Soumettre';
    @Input() buttonClass: string = 'btn btn-primary';
    @Output() onClick = new EventEmitter<void>();

    isLoading: boolean = false;

    async handleClick(): Promise<void> {
        if (this.isLoading) return;

        this.isLoading = true;
        try {
            // Émet l'événement pour que le parent gère la tâche asynchrone
            await this.onClick.emit();
        } finally {
            this.isLoading = false;
        }
    }
}

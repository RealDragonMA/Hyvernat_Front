import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { DefaultErrorMessages } from './error-input.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    standalone: true,
    selector: 'c-error-input',
    imports: [CommonModule, ControlValueAccessorDirective],
    templateUrl: './error-input.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    animations: [trigger('inOutAnimation', [transition(':enter', [style({ height: 0, opacity: 0 }), animate('0.3s ease-out', style({ height: 300, opacity: 1 }))]), transition(':leave', [style({ height: 300, opacity: 1 }), animate('0.3s ease-in', style({ height: 0, opacity: 0 }))])])],
})
export class ErrorInputComponent {
    @Input() public controlName?: string;
    @Input() public formContained!: AbstractControl;

    private get currentControl(): AbstractControl | null {
        if (this.formContained && this.controlName) {
            return this.formContained instanceof FormGroup ? this.formContained.get(this.controlName) : this.formContained;
        }
        return null;
    }

    protected get error(): string {
        return this.currentControl?.errors ? this.getErrorMessage(this.currentControl?.errors) : '';
    }

    private getErrorMessage(errors: Record<string, any>): string {
        const [errorName] = Object.keys(errors);
        const errorFunction = DefaultErrorMessages[errorName];
        if (errorFunction) {
            return errorFunction(errors[errorName]);
        } else {
            return 'An error occurred';
        }
    }

    protected trigger(arg0: string, arg1: any[]): any {
        throw new Error('Function not implemented.');
    }
}

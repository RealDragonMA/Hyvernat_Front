import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ErrorInputComponent } from '../error-input/error-input.component';
import { InputType } from '../input.interface';

@Component({
    selector: 'c-select',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectInputComponent),
            multi: true,
        },
    ],
    imports: [ReactiveFormsModule, NgForOf, NgIf, ErrorInputComponent, NgClass],
    templateUrl: './select-input.component.html',
})
export class SelectInputComponent<T> extends ControlValueAccessorDirective<T> implements InputType {
    @Input() id = '';
    @Input() value?: string | number | undefined;
    @Input() customErrorMessages: Record<string, string> = {};
    @Input() label?: string;
    @Input() options: { value: T; label: string }[] = [];
    @Input() selectId: string = '';
    @Input() description?: string;
    @Input() name!: string;
    @Input() placeholder?: string;

    @Input()
    set disabled(value: boolean) {
        this.setDisabledState(value);
    }

    public get disabled(): boolean {
        return this._isDisabled;
    }
}

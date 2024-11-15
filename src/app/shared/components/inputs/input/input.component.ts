import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, forwardRef, OnInit } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ErrorInputComponent } from '../error-input/error-input.component';
import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { InputType } from '../input.interface';

@Component({
    standalone: true,
    selector: 'c-input',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorInputComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
    templateUrl: './input.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> implements InputType {
    @Input() id = '';
    @Input() value?: string | number | undefined;
    @Input() customErrorMessages: Record<string, string> = {};
    @Input() name!: string;
    @Input() description?: string;
    @Input() label?: string;
    @Input() icon?: string;
    @Input()
    set disabled(value: boolean) {
        this.setDisabledState(value);
    }

    public get disabled(): boolean {
        return this._isDisabled;
    }
}

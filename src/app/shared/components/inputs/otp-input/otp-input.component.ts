import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { ErrorInputComponent } from '../error-input/error-input.component';

function createFormArray(size: number): FormArray {
    return new FormArray(Array.from({ length: size }, () => new FormControl('')));
}

@Component({
    selector: 'c-otp-input',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, ErrorInputComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: OtpInputComponent,
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: OtpInputComponent,
            multi: true,
        },
    ],
    templateUrl: './otp-input.component.html',
    styles: [
        `
            input {
                text-align: center;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputComponent implements ControlValueAccessor, Validator, OnInit {
    @ViewChildren('inputEl') inputEls!: QueryList<ElementRef<HTMLInputElement>>;

    private _size: number = 4;
    inputs: FormArray = createFormArray(this._size);

    protected gridSize: string = 'grid-cols-' + this._size;

    protected onChange: (value: string) => void = () => {};
    protected onTouched: () => void = () => {};

    public ngOnInit(): void {
        this.gridSize = 'grid-cols-' + this._size;
    }

    @Input()
    set size(size: number) {
        this._size = size;
        this.inputs = createFormArray(this._size);
    }

    get size(): number {
        return this._size;
    }

    writeValue(value: string): void {
        if (value) {
            const values = value.split('');
            for (let i = 0; i < this._size; i++) {
                this.inputs.controls[i].setValue(values[i] || '');
            }
        } else {
            this.inputs.setValue(new Array(this._size).fill(''));
        }
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.inputs.disable() : this.inputs.enable();
    }

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value.length < this._size) {
            return { otpInput: 'Le code OTP est incomplet' };
        }
        if (!value.match(/^\d+$/)) {
            return { otpInput: 'Le code OTP doit être composé de chiffres' };
        }
        if (!value) {
            return { otpInput: 'Le code OTP est requis' };
        }
        return null;
    }

    handleKeyDown(event: KeyboardEvent, index: number): void {
        const control = this.inputs.controls[index];
        if (event.key === 'Backspace' || event.key === 'Delete') {
            if (control.value) {
                control.setValue('');
            } else if (index > 0) {
                this.focusInput(index - 1);
                this.inputs.controls[index - 1].setValue('');
            }
            this.updateWiredValue();
        }
    }

    handleInputChange(event: Event, index: number): void {
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;

        if (!/^\d$/.test(value)) {
            inputElement.value = '';
            return;
        }

        this.inputs.controls[index].setValue(value);

        if (value && index + 1 < this.size) {
            this.focusInput(index + 1);
        }

        this.updateWiredValue();
    }

    handlePaste(event: ClipboardEvent): void {
        event.preventDefault();
        const pasteData = event.clipboardData?.getData('text') ?? '';

        if (!/^\d+$/.test(pasteData) || pasteData.length !== this.size) return;

        for (let i = 0; i < this.size; i++) {
            this.inputs.controls[i].setValue(pasteData[i] || '');
        }

        this.updateWiredValue();
        this.onTouched();
    }

    private focusInput(index: number): void {
        this.inputEls.get(index)?.nativeElement.focus();
    }

    handleFocus(event: FocusEvent): void {
        (event.target as HTMLInputElement).select();
    }

    private updateWiredValue(): void {
        const value = this.inputs.value.join('');
        this.onChange(value);
        this.onTouched();
    }
}

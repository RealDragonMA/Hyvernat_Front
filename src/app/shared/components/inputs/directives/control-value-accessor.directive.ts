import { Directive, Inject, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroup, FormGroupDirective, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { Subject, distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs';

@Directive({
    standalone: true,
    selector: '[customLabel]',
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor, OnChanges, OnInit {
    constructor(@Inject(Injector) private injector: Injector) {}

    @Input() type: 'number' | 'text' | 'email' | 'password' | 'list' | 'radio' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'url' | 'tel' | 'search' | 'color' | 'file' = 'text';
    @Input() additionalValidators: ValidatorFn[] = [];

    control: FormControl | undefined;
    protected _isDisabled!: boolean;
    protected isRequired: boolean = false;
    private _destroy$ = new Subject<void>();
    private _onTouched!: () => T;

    protected getValidatorsForType(type: string): ValidatorFn[] | null {
        switch (type) {
            case 'email':
                return [Validators.email];
            case 'number':
                return [Validators.pattern(/^[0-9]*$/)];
            case 'password':
                return [Validators.minLength(8)];
            case 'text':
            default:
                return [];
        }
    }

    public updateValidators(): void {
        if (this.control) {
            const typeValidators = this.getValidatorsForType(this.type) || [];
            const combinedValidators = [...typeValidators, ...this.additionalValidators];
            this.control.setValidators(combinedValidators);
            this.control.updateValueAndValidity();
        }
    }

    public ngOnInit(): void {
        this.setFormControl();
        this.updateValidators();
        this.setRequiredState();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['type'] || (changes?.['additionalValidators'] && this.control)) {
            this.updateValidators();
        }
    }

    // ? Debug
    /* observeValueChanges() {
    if (this.control) {
      this.control.valueChanges.subscribe(() => {
        this.getValidatorsForType(this.type);
        console.log('additionalValidators', this.additionalValidators);
      });
    }
  } */
    public setFormControl() {
        try {
            const formControl = this.injector.get(NgControl);

            switch (formControl.constructor) {
                case FormControlName:
                    this.control = this.injector.get(FormGroupDirective).getControl(formControl as FormControlName);
                    break;
                default:
                    this.control = (formControl as FormControlDirective).form as FormControl;
                    break;
            }
            this.setDisabledState(this._isDisabled);
        } catch (err) {
            this.control = new FormControl();
        }

        // ? Debug
        //this.observeValueChanges();
    }

    public writeValue(value: T): void {
        this.control ? this.control.setValue(value) : (this.control = new FormControl(value));
    }

    public registerOnChange(fn: (val: T | null) => T): void {
        this.control?.valueChanges
            .pipe(
                takeUntil(this._destroy$),
                startWith(this.control.value),
                distinctUntilChanged(),
                tap((val) => fn(val)),
            )
            .subscribe();
    }

    public registerOnTouched(fn: () => T): void {
        this._onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this._isDisabled = isDisabled;

        if (this.control) {
            isDisabled ? this.control.disable() : this.control.enable();
        }
    }

    public setRequiredState(): void {
        this.isRequired = this.control ? this.hasValidator(this.control, Validators.required) : false;
    }

    private hasValidator(control: AbstractControl, validatorFn: ValidatorFn): boolean {
        if (control && control.validator) {
            const validators = control.validator({} as AbstractControl);
            return !!validators && validators.hasOwnProperty('required');
        }
        return false;
    }

    protected isValid(): 'valid' | 'invalid' | 'pending' {
        if (!this.control) {
            return 'pending';
        }

        if (!this.control.touched) {
            return 'pending';
        }

        return this.control.valid ? 'valid' : 'invalid';
    }
}

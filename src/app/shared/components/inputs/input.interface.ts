import { FormControl, FormGroup } from '@angular/forms';

type RequiredInputType = {
    name: string;
    type: 'number' | 'text' | 'email' | 'password' | 'list' | 'radio' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'url' | 'tel' | 'search' | 'color' | 'file';
};

type OptionalInputType = {
    value: string | number;
    id: string;
    formGroup: FormGroup;
    formControl: FormControl;
    placeholder: string;
    disabled: boolean;
    description: string;
};

export type InputType = RequiredInputType & Partial<OptionalInputType>;

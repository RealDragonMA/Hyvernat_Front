export type BooleanValue = { requiredLength: number };
export type ErrorFunction = (booleanValue?: BooleanValue, controlName?: string) => string;

export const DefaultErrorMessages: Record<string, ErrorFunction> = {
    required: () => 'Le champ est obligatoire.',
    email: () => "Le format de l'email est invalide.",
    pattern: () => 'Le format est invalide.',
    minlength: (booleanValue: BooleanValue = { requiredLength: 6 }) => `Le champ doit avoir un minimum de ${booleanValue.requiredLength} caractères.`,
    maxlength: (booleanValue: BooleanValue = { requiredLength: 50 }) => `Le champ doit avoir un maximum de ${booleanValue.requiredLength} caractères.`,
    noSimilar: () => 'Les mots de passe ne correspondent pas.',
    alpha: () => 'Le champ doit contenir uniquement des lettres.',
    numeric: () => 'Le champ doit contenir uniquement des chiffres.',
};

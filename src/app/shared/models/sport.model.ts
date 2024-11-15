export interface Sport {
    name: string;
    englishName: string;
    desc: string;
    englishDesc: string;
    image: string;
    material: string[];
    icon?: string;
}

export interface SportPayload {
    name?: string;
    englishName?: string;
    desc?: string;
    englishDesc?: string;
    newName?: string;
    image?: string;
    material?: string[];
    icon?: string;
}

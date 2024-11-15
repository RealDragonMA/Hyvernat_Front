export interface Config {
    name: string;
    classes: string[];
    rooms: Room[];
}

export interface Room {
    name: string;
    maxCapacity: number;
    sports: Sport[];
}

export interface Sport {
    name: string;
    minCapacity: number;
    palier: number;
}

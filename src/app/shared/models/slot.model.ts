export interface Slot {
    _id: string;
    date: number;
    startHour: number;
    endHour: number;
    campus: string;
    site: string;
    call: string[];
    roomsAvailable: string[];
    displayDay?: string;
    displayHour?: string;
    rooms: RoomDetail[];
    relays: string[];
}

export interface RoomDetail {
    name: string;
    practicable: number;
    sports: SportDetail[];
}

export interface SportDetail {
    open: boolean;
    name: string;
    students: string[];
    rate: number;
}

export interface SlotCreatePayload {
    dates: number[];
    startHour: number;
    endHour: number;
    campus: string;
    site: string;
    rooms: {
        name: string;
        sports: string[];
    }[];
}

export interface SlotRatePayload {
    idSlot: string;
    sport: string;
    room?: string;
    amount?: number;
}

export interface SlotUpdatePayload {
    id: string;
    date: number;
    startHour: number;
    endHour: number;
    relayStudentsIds: string[];
    rooms: {
        name: string;
        sports: string[];
    }[];
    campus: string;
}

export interface SlotCallPayload {
    idStudents: string[];
    idSlot: string;
}

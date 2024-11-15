export interface Notification {
    idUser: string;
    email: string;
    notifications: NotificationDetail[];
}

export interface NotificationDetail {
    date: number;
    title: string;
    body: string;
}

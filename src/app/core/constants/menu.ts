import { MenuItem } from '../models/menu.model';

export class Menu {
    public static pages: MenuItem[] = [
        {
            group: 'Accueil',
            separator: false,
            items: [
                {
                    icon: 'assets/icons/heroicons/outline/chart-pie.svg',
                    label: 'Inverser une image',
                    route: '/home/invert-image',
                },
                {
                    icon: 'assets/icons/heroicons/outline/calendar.svg',
                    label: 'Créer un diplôme',
                    route: '/home/diploma',
                },
                {
                    icon: 'assets/icons/heroicons/outline/rules.svg',
                    label: 'Clés RSA',
                    route: '/home/rsa-keys',
                },
                {
                    icon: 'assets/icons/heroicons/outline/rules.svg',
                    label: 'Signer fichier',
                    route: '/home/file-sign',
                },
                {
                    icon: 'assets/icons/heroicons/outline/rules.svg',
                    label: 'Vérifier signature',
                    route: '/home/verif-sign',
                }
            ],
        },
    ];
}

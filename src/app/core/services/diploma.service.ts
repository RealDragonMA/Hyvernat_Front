import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class DiplomaService {
    private readonly baseUrl = 'https://api-cryptologie.mathis-mazoyer.fr';

    constructor() {
        axios.defaults.withCredentials = false;
    }

    /**
     * Créer un diplôme et le télécharger.
     */
    public async createDiploma(data: FormData): Promise<void> {
        try {
            const response = await axios.post(`${this.baseUrl}/create-diploma`, data, {
                responseType: 'blob',
            });

            this.downloadFile(response.data, 'diplome.png', 'image/png');
        } catch (error) {
            console.error('Erreur lors de la création du diplôme', error);
            throw error;
        }
    }

    /**
     * Générer une paire de clés RSA et télécharger la clé privée.
     */
    public async generateKeys(): Promise<void> {
        try {
            const response = await axios.post(`${this.baseUrl}/generate-keys`, {}, {
                responseType: 'blob',
            });

            this.downloadFile(response.data, 'private.pem', 'application/x-pem-file');
        } catch (error) {
            console.error('Erreur lors de la génération des clés', error);
            throw error;
        }
    }

    /**
     * Signer un fichier et télécharger le fichier signé.
     */
    public async signFile(data: FormData): Promise<void> {
        try {
            const response = await axios.post(`${this.baseUrl}/sign-file`, data, {
                responseType: 'blob',
            });

            const filename = data.get('file') ? (data.get('file') as File).name + '.sig' : 'signed_file.sig';
            this.downloadFile(response.data, filename, 'application/octet-stream');
        } catch (error) {
            console.error('Erreur lors de la signature du fichier', error);
            throw error;
        }
    }

    /**
     * Vérifier la signature d'un fichier.
     */
    public async verifySignature(data: FormData): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/verify-signature`, data);
            return response.data.message;
        } catch (error) {
            console.error('Erreur lors de la vérification de la signature', error);
            throw error;
        }
    }

    /**
     * Inverser les couleurs de la moitié inférieure d'une image et télécharger l'image modifiée.
     */
    public async invertImage(data: FormData): Promise<void> {
        try {
            const response = await axios.post(`${this.baseUrl}/invert_image`, data, {
                responseType: 'blob',
            });

            const filename = data.get('image') ? 'inverted_' + (data.get('image') as File).name : 'inverted_image.png';
            this.downloadFile(response.data, filename, 'image/png');
        } catch (error) {
            console.error('Erreur lors de l\'inversion de l\'image', error);
            throw error;
        }
    }

    /**
     * Fonction utilitaire pour télécharger un fichier.
     */
    private downloadFile(data: Blob, filename: string, type: string): void {
        const url = window.URL.createObjectURL(new Blob([data], { type }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}

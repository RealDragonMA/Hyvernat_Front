import { Injectable, isDevMode } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { EHttpMethod, IParams, IErrorResponse } from './axios.model';
import qs from 'qs';

@Injectable({
    providedIn: 'root',
})
export class AxiosService {
    private http: AxiosInstance;
    private cancelTokenSource: CancelTokenSource;

    constructor() {
        this.http = axios.create({
            baseURL: 'https://api-cryptologie.mathis-mazoyer.fr',
            withCredentials: false,
        });

        this.cancelTokenSource = axios.CancelToken.source();
        this.injectInterceptors();
    }

    // Récupérer le token d'authentification
    private getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Configuration des headers
    private setupHeaders(hasAttachment: boolean = false, customHeaders?: Record<string, string>): Record<string, string> {
        const token = this.getToken();
        const authorizationHeader = token ? `Bearer ${token}` : '';

        return {
            'Content-Type': hasAttachment ? 'multipart/form-data' : 'application/json',
            Authorization: authorizationHeader,
            ...customHeaders,
        };
    }

    // Méthode générique pour faire des requêtes HTTP
    private async request<T>(method: EHttpMethod, url: string, options: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.request<T>({
                method,
                url,
                cancelToken: this.cancelTokenSource.token,
                ...options,
            });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
            throw error;
        }
    }

    // GET Request
    public async get<T>(url: string, params?: IParams, hasAttachment = false): Promise<T> {
        return this.request<T>(EHttpMethod.GET, url, {
            params: params,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
            headers: this.setupHeaders(hasAttachment),
        });
    }

    // POST Request
    public async post<T, P>(url: string, payload: P, params?: IParams, hasAttachment = false): Promise<T> {
        return this.request<T>(EHttpMethod.POST, url, {
            params,
            data: payload,
            headers: this.setupHeaders(hasAttachment),
        });
    }

    // PUT Request
    public async put<T, P>(url: string, payload: P, params?: IParams, hasAttachment = false): Promise<T> {
        return this.request<T>(EHttpMethod.PUT, url, {
            params,
            data: payload,
            headers: this.setupHeaders(hasAttachment),
        });
    }

    // DELETE Request
    public async delete<T>(url: string, params?: IParams, hasAttachment = false): Promise<T> {
        return this.request<T>(EHttpMethod.DELETE, url, {
            params,
            headers: this.setupHeaders(hasAttachment),
        });
    }

    // Annuler toutes les requêtes en cours
    public cancelRequests() {
        this.cancelTokenSource.cancel("Requête annulée par l'utilisateur");
        this.cancelTokenSource = axios.CancelToken.source();
    }

    // Injecter des interceptors
    private injectInterceptors() {
        this.http.interceptors.request.use(
            (request) => {
                if (isDevMode()) {
                    console.log('Requête envoyée:', request);
                }
                return request;
            },
            (error) => {
                if (isDevMode()) {
                    console.error('Erreur de requête:', error);
                }
                return Promise.reject(error);
            },
        );

        // Interceptor pour les réponses
        this.http.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    // Gérer le rafraîchissement du token si nécessaire
                    await this.refreshToken();
                }
                this.handleError(error);
                return Promise.reject(error);
            },
        );
    }

    // Gestion centralisée des erreurs
    private handleError(error: any) {
        if (axios.isCancel(error)) {
            console.warn('Requête annulée:', error.message);
        } else {
            const errorMsg = error.response?.data?.message || error.message || 'Erreur inconnue';
            console.error('Erreur:', errorMsg);
            // Optionnel : Afficher une notification d'erreur à l'utilisateur
        }
    }

    // Rafraîchir le token (exemple)
    private async refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return;

        try {
            const response = await this.http.post('/auth/refresh', { refreshToken });
            const newToken = response.data?.token;
            if (newToken) {
                localStorage.setItem('token', newToken);
            }
        } catch (error) {
            console.error('Erreur lors du rafraîchissement du token:', error);
            localStorage.removeItem('token');
        }
    }

    private flattenParams(params: IParams): Record<string, any> {
        const flatParams: Record<string, any> = {};
        for (const key in params) {
            if (params[key] !== undefined && params[key] !== null) {
                flatParams[key] = params[key];
            }
        }
        return flatParams;
    }
}

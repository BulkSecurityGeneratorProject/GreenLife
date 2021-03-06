import { HttpClient, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { JhiDateUtils } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { Usuario } from './usuario.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Usuario>;

@Injectable()
export class UsuarioService {

    private resourceUrl = SERVER_API_URL + 'api/usuarios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/usuarios';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(usuario: Usuario): Observable<EntityResponseType> {
        const copy = this.convert(usuario);
        return this.http.post<Usuario>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(usuario: Usuario): Observable<EntityResponseType> {
        const copy = this.convert(usuario);
        return this.http.put<Usuario>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Usuario>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Usuario[]>> {
        const options = createRequestOption(req);
        return this.http.get<Usuario[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Usuario[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Usuario[]>> {
        const options = createRequestOption(req);
        return this.http.get<Usuario[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Usuario[]>) => this.convertArrayResponse(res));
    }

    findByUserLogin(login: string): Observable<EntityResponseType> {
        return this.http.get<Usuario>(`${this.resourceUrl}/login/${login}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Usuario = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Usuario[]>): HttpResponse<Usuario[]> {
        const jsonResponse: Usuario[] = res.body;
        const body: Usuario[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Usuario.
     */
    private convertItemFromServer(usuario: Usuario): Usuario {
        const copy: Usuario = Object.assign({}, usuario);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(usuario.fechaCreacion);
        copy.fechaNacimiento = this.dateUtils
            .convertLocalDateFromServer(usuario.fechaNacimiento);
        return copy;
    }

    /**
     * Convert a Usuario to a JSON which can be sent to the server.
     */
    private convert(usuario: Usuario): Usuario {
        const copy: Usuario = Object.assign({}, usuario);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(usuario.fechaCreacion);
        copy.fechaNacimiento = this.dateUtils
            .convertLocalDateToServer(usuario.fechaNacimiento);
        return copy;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PokemonService {
    private baseUrl = 'https://pokeapi.co/api/v2/';
    constructor(private http: HttpClient) { }


    getPokemonList(offset: number, limit: number): Observable<any> {
        return this.http.get(this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit);
    }

    getPokemonDetail(pokemon: number | string): Observable<any> {
        return this.http.get(this.baseUrl + 'pokemon/' + pokemon);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IFilter } from '../interfaces/ifilter';
import { Observable } from 'rxjs';
import { ICocktail } from '../interfaces/icoctail';
import { Cocktail } from '../models/cocktail.model';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  getCocktailsFilter(filter: IFilter) {

    const urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/';
    let additionalUrl = '';

    if (filter.searchBy === 'name') {
      additionalUrl = 'search.php?s=' + filter.value;
    } else {
      additionalUrl = 'filter.php?';

      if (filter.searchBy === 'glass') {
        additionalUrl += 'g=';
      } else if (filter.searchBy === 'category') {
        additionalUrl += 'c=';
      } else {
        additionalUrl += 'i=';
      }
      additionalUrl += filter.value;

    }

    const finalUrl = urlBase + additionalUrl;

    return this.http.get(finalUrl).pipe(
      map((data: Cocktail) => this.parseData(_.get(data, 'drinks')))
    );

  }

  private parseData(listCocktails) {

     const newListCoktails = [];

     _.forEach(listCocktails, c => {
       const cocktail = new Cocktail(c);
       newListCoktails.push(cocktail);
     });

     return newListCoktails;
  }

  getCocktailById(id: string) {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i= ' + id).pipe(
       map(data => {
         const list = this.parseData(_.get(data, 'drinks'));
         console.log(list[0]);
         return list[0];
       })
    );
  }

}

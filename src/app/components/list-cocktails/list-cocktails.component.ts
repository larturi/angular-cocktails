import { Component, OnInit } from '@angular/core';
import { IFilter } from '../../interfaces/ifilter';
import { CocktailService } from '../../services/cocktail.service';
import { Cocktail } from '../../models/cocktail.model';

@Component({
  selector: 'app-list-cocktails',
  templateUrl: './list-cocktails.component.html',
  styleUrls: ['./list-cocktails.component.css']
})
export class ListCocktailsComponent implements OnInit {

  public showFilter: boolean;
  public filter: IFilter;
  public listCocktails: Cocktail[] = [];
  public loadingCocktails = false;
  public items = 12;
  public page = 1;

  constructor(private cocktailService: CocktailService) {
    this.filter = {
      searchBy: 'name',
      value: ''
    };

    if (localStorage.getItem('searchBy')) {
      this.filter.searchBy = localStorage.getItem('searchBy');
      this.filter.value = localStorage.getItem('value');
      this.showFilter = true;
      this.filterData();
    }
  }

  ngOnInit(): void {
  }

  hideShowFilter() {
      this.showFilter = !this.showFilter;
  }

  filterData() {

    localStorage.setItem('searchBy', this.filter.searchBy);
    localStorage.setItem('value', this.filter.value);

    this.cocktailService.getCocktailsFilter(this.filter)
       .subscribe(cocktails => {
           this.loadingCocktails = true;
           this.listCocktails = cocktails;
           this.loadingCocktails = false;
       });
  }

}

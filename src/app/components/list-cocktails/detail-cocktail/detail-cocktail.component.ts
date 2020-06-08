import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CocktailService } from '../../../services/cocktail.service';
import { Cocktail } from '../../../models/cocktail.model';

@Component({
  selector: 'app-detail-cocktail',
  templateUrl: './detail-cocktail.component.html',
  styleUrls: ['./detail-cocktail.component.css']
})
export class DetailCocktailComponent implements OnInit {

  public cocktail: Cocktail;
  public loadingCocktail = false;

  constructor(private cocktailService: CocktailService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.cocktailService.getCocktailById(id).subscribe(c => {
        this.loadingCocktail = true;
        this.cocktail = c;
        this.loadingCocktail = false;
      }, error => {
        console.error(error);
      });
    }, error => {
      console.error(error);
    });
  }

}

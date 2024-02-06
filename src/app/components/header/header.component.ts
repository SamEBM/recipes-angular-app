import { Component } from "@angular/core";
import { RecipeService } from "../../services/recipe.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

constructor(private recipesService: RecipeService){}

    collapsed: boolean = true;

    onSaveRecipes(){
        this.recipesService.storeRecipes();
    }

    onFetchRecipes(){
        this.recipesService.fetchRecipes().subscribe();
    }
}
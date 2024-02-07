import { Component, OnDestroy, OnInit } from "@angular/core";
import { RecipeService } from "../../services/recipe.service";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

constructor(private recipesService: RecipeService, private authService: AuthService){}
    private userSubscription: Subscription;
    isAuthenticated: boolean = false;
    collapsed: boolean = true;

    ngOnInit(): void {
        this.userSubscription = this.authService.currentUser.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onSaveRecipes(){
        this.recipesService.storeRecipes();
    }

    onFetchRecipes(){
        this.recipesService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }
}
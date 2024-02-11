import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then( m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./components/shopping-list/shopping-list.module').then( m => m.ShoppingListModule ) },
    { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then( m => m.AuthModule) }
    // { path: 'not-found', component: PageNotFoundComponent },
    // { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [
        // Si el web server que hostee esta aplicacion no permite definir una pagina en caso de 404, se debe usar el hash '#' en las rutas 
        // RouterModule.forRoot(appRoutes, {useHash: true})
        // PreloadAllModules ayuda a optimizar la descarga de código, ya que que se precargan los modulos con Lazy Loading aunque aún no se usen, lo que permite
        // que peticiones subsecuentes sean más rápidas 
        // Al entrar a la ruta auth/ primero se descarga el bundle de ese módulo y en el background los demás
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ], 
    exports: [RouterModule]
})
export class AppRoutingModule {

}
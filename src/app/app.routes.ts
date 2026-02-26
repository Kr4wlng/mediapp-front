import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';

// Los archivos routes.ts sirven para definir nuestras reglas de navegacion
export const routes: Routes = [

    /* 
       path => referencia a la ruta que estamos definiendo
       redirectTo => redireccionamiento a algo (en este caso una ruta)
       pathMatch => propiedad de configuración que define la estrategia para emparejar la URL con una ruta
       component => referencia al componente que queremos relacionar a la ruta
    */
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'pages',
        component: LayoutComponent,
        loadChildren: () => import('./pages/pages.routes').then(x => x.pagesRoutes)
        /* loadChildren => O conocido también como 'Lazy loading'
           En este caso cargaremos unas rutas que vamos a importar de un archivo de routeo extra
           que hayamos definido (pages.routes). De ahi vamos a decir que ese elemento (x) exponga
           el archivo de routeo (x.pagesRoutes)
        */
    }

];

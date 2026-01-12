import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/expenses/expenses.routes')
        .then(m => m.EXPENSES_ROUTES)
  }
];
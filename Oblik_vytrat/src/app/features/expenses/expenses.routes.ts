import { Routes } from '@angular/router';
import { ExpensesPageComponent } from './pages/expenses-page.component';
import { ExpenseSearchComponent } from './components/expense-search/expense-search.component';

export const EXPENSES_ROUTES: Routes = [
  { path: '', component: ExpensesPageComponent },
  { path: 'search', component: ExpenseSearchComponent }
];

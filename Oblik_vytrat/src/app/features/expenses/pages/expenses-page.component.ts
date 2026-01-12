import { Component } from '@angular/core';
import { ExpenseFormComponent } from '../components/expense-form/expense-form.component';
import { ExpenseListComponent } from '../components/expense-list/expense-list.component';

@Component({
  selector: 'app-expenses-page',
  standalone: true,
  imports: [ExpenseFormComponent, ExpenseListComponent],
  template: `
    <h1>Облік витрат</h1>
    <app-expense-form />
    <hr />
    <app-expense-list />
  `
})
export class ExpensesPageComponent {}

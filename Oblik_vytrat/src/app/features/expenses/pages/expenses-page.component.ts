import { Component } from '@angular/core';
import { ExpenseFormComponent } from '../components/expense-form/expense-form.component';
import { ExpenseListComponent } from '../components/expense-list/expense-list.component';

@Component({
  selector: 'app-expenses-page',
  standalone: true,
  imports: [ExpenseFormComponent, ExpenseListComponent],
  template: `
  <div class="container">
    <h1>Облік витрат</h1>

    <div class="card">
      <app-expense-form />
    </div>

    <div class="card">
      <app-expense-list />
    </div>
  </div>`,
  styles: [`
  .container {
    max-width: 600px;
    margin: 30px auto;
  }

  .card {
    background: #ffffff;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  `]
})
export class ExpensesPageComponent {}

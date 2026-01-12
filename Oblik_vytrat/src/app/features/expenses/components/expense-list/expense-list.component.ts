import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../../../core/services/expense.servise';
import { Expense } from '../../../../core/models/expense.model';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h3>Expenses</h3>

  <ul>
    <li *ngFor="let e of expenses">
      {{ e.date }} — {{ e.category }} — {{ e.amount }}
      <button (click)="remove(e.id)">X</button>
    </li>
  </ul>

  <strong>Total: {{ total }}</strong>
`
})

export class ExpenseListComponent {

  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {
    this.expenses = this.expenseService.getExpenses();
  }

  get total(): number {
    return this.expenseService.getTotal();
  }

  remove(id: number): void {
  this.expenseService.removeExpense(id);
  }

}

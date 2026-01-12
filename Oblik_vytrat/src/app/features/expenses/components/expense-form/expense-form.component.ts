import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../../../core/services/expense.servise';
import { Expense } from '../../../../core/models/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>Add expense</h3>

    <input type="number" [(ngModel)]="amount" placeholder="Amount" />
    <input type="text" [(ngModel)]="category" placeholder="Category" />
    <input type="date" [(ngModel)]="date" />

    <button (click)="add()">Add</button>
  `
})
export class ExpenseFormComponent {

  amount!: number;
  category = '';
  date = '';

  constructor(private expenseService: ExpenseService) {}

  add(): void {
    const expense: Expense = {
      id: Date.now(),
      amount: this.amount,
      category: this.category,
      date: this.date
    };

    this.expenseService.addExpense(expense);

    this.amount = 0;
    this.category = '';
    this.date = '';
  }
}

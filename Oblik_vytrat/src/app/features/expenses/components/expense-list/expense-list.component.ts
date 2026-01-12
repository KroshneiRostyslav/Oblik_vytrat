import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ExpenseService } from '../../../../core/services/expense.servise';
import { Expense } from '../../../../core/models/expense.model';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Expenses</h3>

    <ul class="list">
      <li *ngFor="let e of expenses$ | async">
        <span>{{ e.date }}</span>
        <span>{{ e.category }}</span>
        <span>{{ e.amount }}</span>
        <button (click)="remove(e.id)">✕</button>
      </li>
    </ul>

    <div class="total">
      Total: {{ getTotal(expenses$ | async) }}
    </div>
  `,
  styles: [`
    .list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: grid;
      grid-template-columns: 1fr 1fr 80px 40px;
      gap: 8px;
      padding: 6px 0;
      border-bottom: 1px solid #eee;
      align-items: center;
    }

    li span {
      overflow-wrap: break-word;
    }

    .total {
      margin-top: 10px;
      font-weight: bold;
    }

    button {
      background-color: #ff4d4f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      height: 28px;
    }

    button:hover {
      background-color: #ff7875;
    }
  `]
})
export class ExpenseListComponent {
  expenses$!: Observable<Expense[]>;

  constructor(private expenseService: ExpenseService) {
    this.expenses$ = this.expenseService.expenses$;
  }

  remove(id: number): void {
    this.expenseService.removeExpense(id);
  }

  getTotal(expenses: Expense[] | null | undefined): number {
    if (!expenses) return 0;
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }
}

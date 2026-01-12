import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../../../core/services/expense.servise';
import { Expense } from '../../../../core/models/expense.model';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Expenses</h3>

    <ul class="list">
      <li *ngFor="let e of expenses">
        <span>{{ e.date }}</span>
        <span>{{ e.category }}</span>
        <span>{{ e.amount }}</span>
        <button (click)="remove(e.id)">✕</button>
      </li>
    </ul>

    <div class="total">
      Total: {{ total }}
    </div>
  `,
  styles: [`
    .list {
      list-style: none;
      padding: 0;
    }

    li {
      display: grid;
      grid-template-columns: 1fr 1fr 80px 40px;
      gap: 8px;
      padding: 6px 0;
      border-bottom: 1px solid #eee;
      align-items: center;
    }

    .total {
      margin-top: 10px;
      font-weight: bold;
    }

    button {
      background: #ff4d4f;
      color: white;
      border: none;
      border-radius: 4px;
    }
  `]
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(public expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.expenses$.subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  get total(): number {
    return this.expenseService.getTotal();
  }

  remove(id: number): void {
    this.expenseService.removeExpense(id);
  }
}

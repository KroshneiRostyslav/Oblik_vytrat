import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../../../core/services/expense.servise';
import { Expense } from '../../../../core/models/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>Додати витрати</h3>

    <div class="form-row">
      <input type="number" [(ngModel)]="amount" placeholder="Сума" />
      <input type="text" [(ngModel)]="category" placeholder="Категорія" />
      <input type="date" [(ngModel)]="date" />
      <button (click)="add()">Додати</button>
    </div>


  `,
 styles: [`
    .form-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr) auto;
      gap: 8px;
      align-items: center;
    }

    input {
      flex: 1;
      min-width: 120px;
    }

    button {
      white-space: nowrap;
    }
  `]
})
export class ExpenseFormComponent {

  amount!: number;
  category = '';
  date = this.getToday();

  constructor(private expenseService: ExpenseService) {}
  
  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

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
  }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { ExpenseService } from '../../../../core/services/expense.servise';
import { Expense } from '../../../../core/models/expense.model';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>Expenses</h3>

    <label>
      Filter by Category:
      <select (change)="setCategoryFilter($event)">
        <option value="">All</option>
        <option *ngFor="let cat of categories$ | async" [value]="cat">{{ cat }}</option>
      </select>
    </label>


    <ul class="list">
      <li *ngFor="let e of filteredExpenses$ | async">
        <span>{{ e.date }}</span>
        <span>{{ e.category }}</span>
        <span>{{ e.amount }}</span>
        <button (click)="remove(e.id)">✕</button>
      </li>
    </ul>

    <div class="total">
      Total: {{ total$ | async }}
    </div>`,
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
  private categoryFilterSubject = new BehaviorSubject<string | null>(null);

  allExpenses$!: Observable<Expense[]>;
  categories$!: Observable<string[]>;
  filteredExpenses$!: Observable<Expense[]>;
  total$!: Observable<number>;

  constructor(private expenseService: ExpenseService) {
    this.allExpenses$ = this.expenseService.expenses$;

    this.categories$ = this.allExpenses$.pipe(
      map(expenses =>
        [...new Set(expenses.map(e => e.category).filter(c => c))]
      )
    );


    this.filteredExpenses$ = combineLatest([
      this.allExpenses$,
      this.categoryFilterSubject
    ]).pipe(
      map(([expenses, filter]) =>
        !filter ? expenses : expenses.filter(e => e.category === filter)
      )
    );

    this.total$ = this.filteredExpenses$.pipe(
      map(expenses => expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0))
    );
  }

  setCategoryFilter(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.categoryFilterSubject.next(select.value || null);
  }

  remove(id: number) {
    this.expenseService.removeExpense(id);
  }
}

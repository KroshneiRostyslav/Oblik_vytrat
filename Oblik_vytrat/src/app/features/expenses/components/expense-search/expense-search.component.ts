import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { ExpenseService } from '../../../../core/services/expense.servise';
import { Expense } from '../../../../core/models/expense.model';

@Component({
  selector: 'app-expense-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'expense-search.component.html',
  styleUrls: ['expense-search.component.css']
})
export class ExpenseSearchComponent {
  private categoryFilterSubject = new BehaviorSubject<string | null>(null);
  private minAmountSubject = new BehaviorSubject<number | null>(null);
  private maxAmountSubject = new BehaviorSubject<number | null>(null);

  filteredExpenses$!: Observable<Expense[]>;
  categories$!: Observable<string[]>;
  total$!: Observable<number>;

  minAmount: number | null = null;
  maxAmount: number | null = null;

  constructor(private expenseService: ExpenseService) {
    const allExpenses$ = this.expenseService.expenses$;

    this.categories$ = allExpenses$.pipe(
      map(expenses => [...new Set(expenses.map(e => e.category).filter(c => c))])
    );

    this.filteredExpenses$ = combineLatest([
      allExpenses$,
      this.categoryFilterSubject,
      this.minAmountSubject,
      this.maxAmountSubject
    ]).pipe(
      map(([expenses, category, min, max]) => this.filterExpenses(expenses, category, min, max))
    );

    this.total$ = this.filteredExpenses$.pipe(
      map(expenses => expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0))
    );
  }

  private filterExpenses(expenses: Expense[], category: string | null, min: number | null, max: number | null): Expense[] {
    return expenses.filter(e =>
      (!category || category === '' || e.category === category) &&
      (min === null || e.amount >= min) &&
      (max === null || e.amount <= max)
    );
  }

  setCategory(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.categoryFilterSubject.next(select.value || null);
  }

  updateFilters() {
    this.minAmountSubject.next(this.minAmount !== null ? this.minAmount : null);
    this.maxAmountSubject.next(this.maxAmount !== null ? this.maxAmount : null);
  }
}

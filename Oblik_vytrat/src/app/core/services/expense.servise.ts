import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Expense } from '../models/expense.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {

  private readonly STORAGE_KEY = 'expenses';
  private expenses: Expense[] = [];

  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  readonly expenses$ = this.expensesSubject.asObservable();

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.load();
      this.expensesSubject.next([...this.expenses]);
    }
  }

  private load(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    this.expenses = data ? JSON.parse(data) : [];
  }

  private save(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.expenses));
    }
  }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
    this.save();
    this.expensesSubject.next([...this.expenses]);
  }

  removeExpense(id: number): void {
    this.expenses = this.expenses.filter(e => e.id !== id);
    this.save();
    this.expensesSubject.next([...this.expenses]);
  }

  getTotal(): number {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }
}
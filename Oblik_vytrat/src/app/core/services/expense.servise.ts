import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private readonly STORAGE_KEY = 'expenses';
  private expenses: Expense[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.load();
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

  getExpenses(): Expense[] {
    return this.expenses;
  }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
    this.save();
  }

  removeExpense(id: number): void {
    this.expenses = this.expenses.filter(e => e.id !== id);
    this.save();
  }

  getTotal(): number {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }
}

import { defineStore } from 'pinia';
import type { Product, ProductsState } from '~/types';

const mockProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Продукт ${i + 1}`,
  status: i % 2 === 0 ? 'успешный' : 'провальный',
  price: Math.floor(Math.random() * 1000) + 1,
  category: `Категория ${Math.floor(i / 3) + 1}`,
  date_created: new Date(2025, 0, i + 1).toISOString()
}));

export const useProductStore = defineStore('products', {
  state: (): ProductsState => ({
    products: mockProducts,
    filteredProducts: mockProducts
  }),

  actions: {
    filterByDate(startDate: string, endDate: string) {
      if (!startDate && !endDate) {
        this.filteredProducts = this.products;
        return;
      }

      this.filteredProducts = this.products.filter(product => {
        const productDate = new Date(product.date_created);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();
        return productDate >= start && productDate <= end;
      });
    },

    filterByCategory(categories: string[]) {
      if (!categories.length) {
        this.filteredProducts = this.products;
        return;
      }

      this.filteredProducts = this.products.filter(product =>
        categories.includes(product.category)
      );
    }
  }
});
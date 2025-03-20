export interface Credentials {
  username: string;
  passphrase: string;
}

export interface User {
  name: string;
  surname: string;
  credentials: Credentials;
  active: boolean;
  _comment?: string;
}

export interface AuthUser {
  name: string;
  surname: string;
  username: string;
}

export interface Product {
  id: number;
  name: string;
  status: 'успешный' | 'провальный';
  price: number;
  category: string;
  date_created: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
}
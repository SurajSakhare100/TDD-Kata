// Seed data exports for easy access

export interface SeedUser {
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface SeedSweet {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export const seedUsers: SeedUser[] = [
  {
    email: 'admin@sweetshop.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    email: 'user@sweetshop.com',
    password: 'user123',
    role: 'user',
  },
  {
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
  },
];

export const seedSweets: SeedSweet[] = [
  // Chocolate Category
  {
    name: 'Dark Chocolate Bar',
    category: 'Chocolate',
    price: 4.99,
    quantity: 50,
  },
  {
    name: 'Milk Chocolate Bar',
    category: 'Chocolate',
    price: 3.99,
    quantity: 75,
  },
  {
    name: 'White Chocolate Bar',
    category: 'Chocolate',
    price: 4.49,
    quantity: 30,
  },
  {
    name: 'Chocolate Truffles',
    category: 'Chocolate',
    price: 12.99,
    quantity: 25,
  },
  
  // Candy Category
  {
    name: 'Gummy Bears',
    category: 'Candy',
    price: 2.99,
    quantity: 100,
  },
  {
    name: 'Sour Patch Kids',
    category: 'Candy',
    price: 3.49,
    quantity: 80,
  },
  {
    name: 'Jelly Beans',
    category: 'Candy',
    price: 2.49,
    quantity: 120,
  },
  {
    name: 'Lollipops',
    category: 'Candy',
    price: 1.99,
    quantity: 150,
  },
  
  // Cookies Category
  {
    name: 'Chocolate Chip Cookies',
    category: 'Cookies',
    price: 5.99,
    quantity: 40,
  },
  {
    name: 'Oatmeal Raisin Cookies',
    category: 'Cookies',
    price: 5.49,
    quantity: 35,
  },
  {
    name: 'Sugar Cookies',
    category: 'Cookies',
    price: 4.99,
    quantity: 45,
  },
  
  // Pastries Category
  {
    name: 'Croissant',
    category: 'Pastries',
    price: 3.99,
    quantity: 20,
  },
  {
    name: 'Danish Pastry',
    category: 'Pastries',
    price: 4.49,
    quantity: 15,
  },
  {
    name: 'Eclair',
    category: 'Pastries',
    price: 5.99,
    quantity: 12,
  },
  
  // Ice Cream Category
  {
    name: 'Vanilla Ice Cream',
    category: 'Ice Cream',
    price: 6.99,
    quantity: 30,
  },
  {
    name: 'Chocolate Ice Cream',
    category: 'Ice Cream',
    price: 6.99,
    quantity: 25,
  },
  {
    name: 'Strawberry Ice Cream',
    category: 'Ice Cream',
    price: 6.99,
    quantity: 28,
  },
];


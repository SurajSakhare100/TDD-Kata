import { SweetModel, CreateSweetData, UpdateSweetData, SearchFilters } from '../models/Sweet';

export class SweetService {
  static async createSweet(data: CreateSweetData) {
    return SweetModel.create(data);
  }

  static async getAllSweets(filters?: SearchFilters) {
    return SweetModel.findAll(filters);
  }

  static async getSweetById(id: number) {
    const sweet = await SweetModel.findById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return sweet;
  }

  static async updateSweet(id: number, data: UpdateSweetData) {
    const sweet = await SweetModel.update(id, data);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    return sweet;
  }

  static async deleteSweet(id: number) {
    const deleted = await SweetModel.delete(id);
    if (!deleted) {
      throw new Error('Sweet not found');
    }
    return { message: 'Sweet deleted successfully' };
  }

  static async purchaseSweet(id: number, quantity: number = 1) {
    const sweet = await SweetModel.findById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    if (sweet.quantity < quantity) {
      throw new Error('Insufficient quantity in stock');
    }

    const updated = await SweetModel.purchase(id, quantity);
    if (!updated) {
      throw new Error('Failed to purchase sweet');
    }
    return updated;
  }

  static async restockSweet(id: number, quantity: number) {
    const sweet = await SweetModel.findById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    const updated = await SweetModel.restock(id, quantity);
    if (!updated) {
      throw new Error('Failed to restock sweet');
    }
    return updated;
  }
}


import pool from '../config/database';

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSweetData {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface UpdateSweetData {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
}

export interface SearchFilters {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export class SweetModel {
  static async create(data: CreateSweetData): Promise<Sweet> {
    const result = await pool.query(
      'INSERT INTO sweets (name, category, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.name, data.category, data.price, data.quantity]
    );
    
    return result.rows[0];
  }

  static async findAll(filters?: SearchFilters): Promise<Sweet[]> {
    let query = 'SELECT * FROM sweets WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (filters?.name) {
      query += ` AND name ILIKE $${paramCount}`;
      params.push(`%${filters.name}%`);
      paramCount++;
    }

    if (filters?.category) {
      query += ` AND category = $${paramCount}`;
      params.push(filters.category);
      paramCount++;
    }

    if (filters?.minPrice !== undefined) {
      query += ` AND price >= $${paramCount}`;
      params.push(filters.minPrice);
      paramCount++;
    }

    if (filters?.maxPrice !== undefined) {
      query += ` AND price <= $${paramCount}`;
      params.push(filters.maxPrice);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findById(id: number): Promise<Sweet | null> {
    const result = await pool.query('SELECT * FROM sweets WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, data: UpdateSweetData): Promise<Sweet | null> {
    const updates: string[] = [];
    const params: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      updates.push(`name = $${paramCount}`);
      params.push(data.name);
      paramCount++;
    }
    if (data.category !== undefined) {
      updates.push(`category = $${paramCount}`);
      params.push(data.category);
      paramCount++;
    }
    if (data.price !== undefined) {
      updates.push(`price = $${paramCount}`);
      params.push(data.price);
      paramCount++;
    }
    if (data.quantity !== undefined) {
      updates.push(`quantity = $${paramCount}`);
      params.push(data.quantity);
      paramCount++;
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(id);

    const result = await pool.query(
      `UPDATE sweets SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      params
    );

    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM sweets WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async purchase(id: number, quantity: number): Promise<Sweet | null> {
    const result = await pool.query(
      'UPDATE sweets SET quantity = quantity - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND quantity >= $1 RETURNING *',
      [quantity, id]
    );
    return result.rows[0] || null;
  }

  static async restock(id: number, quantity: number): Promise<Sweet | null> {
    const result = await pool.query(
      'UPDATE sweets SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    return result.rows[0] || null;
  }
}


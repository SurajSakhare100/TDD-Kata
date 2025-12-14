import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { SweetService } from '../services/sweetService';
import { createSweetSchema, updateSweetSchema, searchSweetSchema } from '../utils/validation';

export class SweetController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const validatedData = createSweetSchema.parse(req.body);
      const sweet = await SweetService.createSweet(validatedData);
      res.status(201).json(sweet);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: error.errors[0].message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const filters = searchSweetSchema.parse(req.query);
      const sweets = await SweetService.getAllSweets(filters);
      res.status(200).json(sweets);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: error.errors[0].message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const sweet = await SweetService.getSweetById(id);
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateSweetSchema.parse(req.body);
      const sweet = await SweetService.updateSweet(id, validatedData);
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: error.errors[0].message });
        return;
      }
      if (error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await SweetService.deleteSweet(id);
      res.status(200).json({ message: 'Sweet deleted successfully' });
    } catch (error: any) {
      if (error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async purchase(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const quantity = parseInt(req.body.quantity) || 1;
      const sweet = await SweetService.purchaseSweet(id, quantity);
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      if (error.message === 'Insufficient quantity in stock') {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async restock(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const quantity = parseInt(req.body.quantity);
      if (!quantity || quantity <= 0) {
        res.status(400).json({ error: 'Valid quantity is required' });
        return;
      }
      const sweet = await SweetService.restockSweet(id, quantity);
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}


import { Router } from 'express';
import { SweetController } from '../controllers/sweetController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', authenticateToken, SweetController.getAll);
router.get('/search', authenticateToken, SweetController.getAll);
router.get('/:id', authenticateToken, SweetController.getById);

// Protected routes (require authentication)
router.post('/', authenticateToken, requireAdmin, SweetController.create);
router.put('/:id', authenticateToken, requireAdmin, SweetController.update);
router.delete('/:id', authenticateToken, requireAdmin, SweetController.delete);

// Inventory routes
router.post('/:id/purchase', authenticateToken, SweetController.purchase);
router.post('/:id/restock', authenticateToken, requireAdmin, SweetController.restock);

export default router;


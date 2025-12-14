import { useState } from 'react';
import { Sweet } from '../types';
import { sweetService } from '../services/sweetService';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: number) => void;
  onUpdate: () => void;
  isAdmin: boolean;
}

const SweetCard = ({ sweet, onPurchase, onUpdate, isAdmin }: SweetCardProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      await onPurchase(sweet.id);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${sweet.name}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await sweetService.delete(sweet.id);
      onUpdate();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete sweet');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{sweet.name}</h3>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
            {sweet.category}
          </span>
        </div>
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            ${sweet.price.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">
            Stock:{' '}
            <span className={sweet.quantity === 0 ? 'text-red-600 font-semibold' : 'text-gray-800'}>
              {sweet.quantity}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <button
            onClick={handlePurchase}
            disabled={sweet.quantity === 0 || isPurchasing}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPurchasing ? 'Purchasing...' : 'Purchase'}
          </button>
          {isAdmin && (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => setShowRestockModal(true)}
                className="py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Restock
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? '...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <EditSweetModal
          sweet={sweet}
          onClose={() => setShowEditModal(false)}
          onUpdate={onUpdate}
        />
      )}

      {showRestockModal && (
        <RestockModal
          sweet={sweet}
          onClose={() => setShowRestockModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

const EditSweetModal = ({ sweet, onClose, onUpdate }: { sweet: Sweet; onClose: () => void; onUpdate: () => void }) => {
  const [formData, setFormData] = useState({
    name: sweet.name,
    category: sweet.category,
    price: sweet.price.toString(),
    quantity: sweet.quantity.toString(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sweetService.update(sweet.id, {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      });
      onUpdate();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update sweet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Sweet</h2>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 border border-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RestockModal = ({ sweet, onClose, onUpdate }: { sweet: Sweet; onClose: () => void; onUpdate: () => void }) => {
  const [quantity, setQuantity] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sweetService.restock(sweet.id, parseInt(quantity));
      onUpdate();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to restock sweet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Restock {sweet.name}</h2>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 border border-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to Add</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Restocking...' : 'Restock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SweetCard;

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { sweetService, SearchFilters } from '../services/sweetService';
import { Sweet } from '../types';
import SweetCard from '../components/SweetCard';
import SearchBar from '../components/SearchBar';
import AdminPanel from '../components/AdminPanel';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});

  useEffect(() => {
    loadSweets();
  }, [filters]);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetService.getAll(filters);
      setSweets(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load sweets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id: number) => {
    try {
      await sweetService.purchase(id, 1);
      await loadSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to purchase sweet');
    }
  };

  const handleSweetUpdate = () => {
    loadSweets();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🍬 Sweet Shop</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-90">Welcome, {user?.email}</span>
            {isAdmin && (
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                Admin
              </span>
            )}
            <button
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg border border-white/30 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-8">
        {isAdmin && <AdminPanel onUpdate={handleSweetUpdate} />}

        <div className="mt-8">
          <SearchBar onSearch={setFilters} />

          {loading && (
            <div className="text-center py-12 text-gray-600 text-lg">Loading sweets...</div>
          )}
          {error && (
            <div className="text-center py-12 text-red-600 bg-red-50 rounded-lg text-lg border border-red-200">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {sweets.length === 0 ? (
                <div className="text-center py-12 text-gray-600 text-lg">
                  <p>No sweets found. {isAdmin && 'Add some sweets to get started!'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
                  {sweets.map((sweet) => (
                    <SweetCard
                      key={sweet.id}
                      sweet={sweet}
                      onPurchase={handlePurchase}
                      onUpdate={handleSweetUpdate}
                      isAdmin={isAdmin}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

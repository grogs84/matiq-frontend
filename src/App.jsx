import { useState } from 'react';
import { useItems } from './features/items/hooks/useItems';
import { ItemCard } from './features/items/components/ItemCard';
import { ItemForm } from './features/items/components/ItemForm';
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import './App.css';

function App() {
  const { items, loading, error, createItem, updateItem, deleteItem } = useItems();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleCreateItem = async (itemData) => {
    await createItem(itemData);
    setShowForm(false);
  };

  const handleUpdateItem = async (itemData) => {
    if (editingItem) {
      await updateItem(editingItem.id, itemData);
      setEditingItem(null);
      setShowForm(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = async (itemId) => {
    await deleteItem(itemId);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (loading) {
    return <LoadingSpinner message="Loading items..." />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📦 Matiq - Item Manager</h1>
        <Button onClick={() => setShowForm(true)}>
          ➕ Add New Item
        </Button>
      </header>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <main className="app-main">
        {items.length === 0 ? (
          <div className="empty-state">
            <h2>No items found</h2>
            <p>Create your first item to get started!</p>
            <Button onClick={() => setShowForm(true)}>
              ➕ Create First Item
            </Button>
          </div>
        ) : (
          <div className="items-grid">
            {items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={showForm}
        onClose={handleCloseForm}
        title={editingItem ? 'Edit Item' : 'Create New Item'}
      >
        <ItemForm
          item={editingItem}
          onSubmit={editingItem ? handleUpdateItem : handleCreateItem}
          onCancel={handleCloseForm}
        />
      </Modal>
    </div>
  );
}

export default App;

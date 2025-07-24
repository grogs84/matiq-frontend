import { useState, useEffect } from 'react';
import { itemApi } from '../services/itemApi';

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await itemApi.getAll();
      setItems(data);
    } catch (err) {
      setError('Failed to load items. Make sure the backend server is running.');
      console.error('Error loading items:', err);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item) => {
    try {
      setError(null);
      const newItem = await itemApi.create(item);
      setItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError('Failed to create item');
      throw err;
    }
  };

  const updateItem = async (id, item) => {
    try {
      setError(null);
      const updatedItem = await itemApi.update(id, item);
      setItems(prev => prev.map(i => i.id === id ? updatedItem : i));
      return updatedItem;
    } catch (err) {
      setError('Failed to update item');
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      setError(null);
      await itemApi.delete(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      setError('Failed to delete item');
      throw err;
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refreshItems: loadItems,
  };
};

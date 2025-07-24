export const ItemTypes = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

export const validateItem = (item) => {
  const errors = {};
  
  if (!item.name || item.name.trim().length === 0) {
    errors.name = 'Name is required';
  }
  
  if (item.name && item.name.length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }
  
  if (!item.price || item.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }
  
  if (item.price && item.price > 999999.99) {
    errors.price = 'Price must be less than $999,999.99';
  }
  
  if (item.description && item.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

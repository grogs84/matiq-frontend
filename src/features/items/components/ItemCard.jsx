import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';

export const ItemCard = ({ item, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    onDelete(item.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="item-card">
        <div className="item-header">
          <h3 className="item-name">{item.name}</h3>
          <span className="item-price">${item.price.toFixed(2)}</span>
        </div>
        
        {item.description && (
          <p className="item-description">{item.description}</p>
        )}
        
        <div className="item-actions">
          <Button 
            variant="secondary" 
            size="small"
            onClick={() => onEdit(item)}
          >
            ✏️ Edit
          </Button>
          <Button 
            variant="danger" 
            size="small"
            onClick={() => setShowDeleteModal(true)}
          >
            🗑️ Delete
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Item"
      >
        <p>Are you sure you want to delete <strong>"{item.name}"</strong>?</p>
        <div className="modal-actions">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

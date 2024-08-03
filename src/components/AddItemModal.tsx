import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface AddItemModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (name: string, quantity: number) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ open, handleClose, handleSave }: AddItemModalProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = () => {
    handleSave(name, quantity);
    setName('');
    setQuantity('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Quantity"
          type="text"
          fullWidth
          value={quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal;

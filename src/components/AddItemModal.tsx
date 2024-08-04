import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import CameraComponent from './Camera';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase-config';
import { getItemNameFromImage } from '@/lib/OpenAI'
interface AddItemModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (name: string, quantity: number, imageUrl: string) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ open, handleClose, handleSave }: AddItemModalProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (!open) {
      setName('');
      setQuantity(0);
      setCapturedImage(null);
    }
  }, [open]);

  useEffect(() => {
    const fetchItemName = async () => {
      if (imageUrl) {
        const itemName = await getItemNameFromImage(imageUrl);
        setName(itemName || '');
      }
    };
    fetchItemName();
  }, [imageUrl]);


  const handleSubmit = async () => {
    if (name !== '') {
      let imageUrl = '';
      if (capturedImage) {
        const storageRef = ref(storage, `images/${name}-${Date.now()}.jpg`);
        await uploadString(storageRef, capturedImage, 'data_url');
        imageUrl = await getDownloadURL(storageRef);
      }
      handleSave(name, quantity, imageUrl);
      handleClose();
    }
  };

  const handleCapture = (image: string) => {
    setCapturedImage(image);
    setIsCameraOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
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
          type="number"
          fullWidth
          value={quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
        />
        <Button onClick={() => setIsCameraOpen(true)}>Open Camera</Button>
        {capturedImage && <img src={capturedImage} alt='Captured' style={{ marginTop: '10px', width: '100%' }} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>

      <Dialog open={isCameraOpen} onClose={() => setIsCameraOpen(false)} maxWidth='xl' fullWidth>
        <CameraComponent onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />
      </Dialog>
    </Dialog>
  );
};

export default AddItemModal;

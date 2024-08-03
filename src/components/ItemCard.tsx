import { Box, Card, CardContent, Typography } from '@mui/material';
import CustomButton from './CustomButton';
import { useState } from 'react'; // Import useState from react
import AddItemModal from './AddItemModal';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { revalidatePath } from 'next/cache';

interface ItemCardProps {
  name: string;
  details?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, details }: ItemCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddClick = () => {
        setIsModalOpen(true);
    }
    const handleUseClick=()=>{
        console.log()
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
      };
    
      const  handleSave = async (itemName: string, itemQuantity: number) => {
        await addDoc(collection(db, "pantry-tracker"), {
            name: itemName,
            quantity: itemQuantity
          });
        revalidatePath('/')  
      };
  return (
    <Box sx={{ width: '300px', my: 2 }}>
      <Card 
        elevation={3}
        sx={{
          backgroundColor: 'secondary.light',
          '&:hover': {
            backgroundColor: 'secondary.main',
            transition: 'all 0.2s ease-in-out',
          },
        }}
      >
        <CardContent>
          <Typography 
            variant="h5" 
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
            }}
          >
            {name}
          </Typography>
          {details && (
            <Typography 
              variant="body2" 
              sx={{
                color: 'text.secondary',
                mt: 1,
              }}
            >
              {details}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <CustomButton text="add" onClick={handleAddClick}>Add</CustomButton>
            <CustomButton text="use" onClick={handleUseClick}>Use</CustomButton>
          </Box>
        </CardContent>
      </Card>
      <AddItemModal open={isModalOpen} handleClose={handleModalClose} handleSave={handleSave} />
    </Box>
    
  )
}

export default ItemCard;
'use client';
import { Container, Typography, Grid, Button } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import useFetchItems from '@/hooks/useFetchItems';
import { itemType } from '@/types';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useState, ChangeEvent } from 'react';
import AddItemModal from '@/components/AddItemModal';
import SearchComponent from '@/components/Search';

const Home: React.FC = () => {
  const { itemsList, loading, error, setItemsList } = useFetchItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNewItem = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (itemName: string, itemQuantity: number) => {
    const newItem = { name: itemName, quantity: itemQuantity };
    const docRef = await addDoc(collection(db, "pantry-tracker"), newItem);
    setItemsList((prevItems: itemType[]) => [...prevItems, { ...newItem, id: docRef.id }]);
    setIsModalOpen(false);
  };

  const handleAddItem = async (id: string, currentQuantity: number) => {
    console.log('ID:', id); // Add this line
  console.log('Current Quantity:', currentQuantity); // Add this line
    const updatedQuantity = currentQuantity + 1;
    await updateDoc(doc(db, "pantry-tracker", id), { quantity: updatedQuantity });
    setItemsList((prevItems: itemType[]) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: updatedQuantity } : item
      )
    );
  };

  const handleDeleteItem = async (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      const updatedQuantity = currentQuantity - 1;
      await updateDoc(doc(db, "pantry-tracker", id), { quantity: updatedQuantity });
      setItemsList((prevItems: itemType[]) =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: updatedQuantity } : item
        )
      );
    } else {
      await deleteDoc(doc(db, "pantry-tracker", id));
      setItemsList((prevItems: itemType[]) =>
        prevItems.filter(item => item.id !== id)
      );
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSearchClick = () => {
    const filteredItems = itemsList.filter((item: itemType) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    setItemsList(filteredItems);
  };

  return (
    <Container 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{ color: 'primary.main', mb: 4 }}>
        Pantry Tracker
      </Typography>
      <Button 
        variant='contained' 
        sx={{ bgcolor: 'success.main', color: 'white', '&:hover': { bgcolor: 'success.dark' }, m: 3 }} 
        onClick={handleAddNewItem}
      >
        Add New Item
      </Button>

      <SearchComponent 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
        onSearchClick={handleSearchClick}
      />
      <Grid 
        container 
        spacing={2} 
        sx={{ width: '100%', justifyContent: 'center' }}
      >
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error.message}</Typography>
        ) : (
          itemsList.map((item: itemType) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <ItemCard 
                id={item.id!}
                name={item.name} 
                quantity={item.quantity} 
                handleAddClick={() => handleAddItem(item.id!, item.quantity)}
                handleDeleteClick={() => handleDeleteItem(item.id!, item.quantity)}
              />
            </Grid>
          ))
        )}
      </Grid>
      <AddItemModal open={isModalOpen} handleClose={handleModalClose} handleSave={handleSave} />
    </Container>
  );
}

export default Home;

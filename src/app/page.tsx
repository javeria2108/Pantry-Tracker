'use client'
import React, { useState, ChangeEvent } from 'react';
import ItemCard from '@/components/ItemCard';
import useFetchItems from '@/hooks/useFetchItems';
import { itemType } from '@/types';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import AddItemModal from '@/components/AddItemModal';
import SearchComponent from '@/components/Search';
import { getRecipeRecommendations } from '@/lib/api'
import { Container, Typography, Grid, Button, Paper, Box, Divider } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Home: React.FC = () => {
  const { itemsList, loading, error, setItemsList } = useFetchItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState('');

  const handleAddNewItem = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (itemName: string, itemQuantity: number, imageUrl: string) => {
    const newItem = { name: itemName, quantity: itemQuantity, imageUrl };
    const docRef = await addDoc(collection(db, "pantry-tracker"), newItem);
    setItemsList((prevItems: itemType[]) => [...prevItems, { ...newItem, id: docRef.id }]);
    setIsModalOpen(false);
  };

  const handleAddItem = async (id: string, currentQuantity: number) => {
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

  const handleGetRecipes = async () => {
    const itemNames = itemsList.map(item => item.name);
    try {
      const recipeRecommendations = await getRecipeRecommendations(itemNames);
      setRecipes(recipeRecommendations);
    } catch (error) {
      console.error('Failed to get recipe recommendations', error);
    }
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
      <Button 
        variant='contained' 
        startIcon={<RestaurantIcon />}
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          '&:hover': { bgcolor: 'primary.dark' }, 
          my: 3 
        }} 
        onClick={handleGetRecipes}
      >
        Get Recipes
      </Button>

      {recipes && (
        <Paper elevation={3} sx={{ p: 3, mt: 4, bgcolor: 'background.paper' }}>
          <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>
            Recommended Recipes
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ whiteSpace: 'pre-wrap' }}>
            <Typography variant="body1" component="div">
              {recipes.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line.startsWith('**') ? (
                    <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                      {line.replace(/\*\*/g, '')}
                    </Typography>
                  ) : line.startsWith('Ingredients:') ? (
                    <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
                      {line}
                    </Typography>
                  ) : line.startsWith('Instructions:') ? (
                    <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
                      {line}
                    </Typography>
                  ) : (
                    <Typography paragraph>{line}</Typography>
                  )}
                </React.Fragment>
              ))}
            </Typography>
          </Box>
        </Paper>
      )}
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

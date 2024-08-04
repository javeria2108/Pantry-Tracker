'use client';
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import ItemCard from '@/components/ItemCard';
import useFetchItems from '@/hooks/useFetchItems';
import { itemType } from '@/types';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import AddItemModal from '@/components/AddItemModal';
import SearchComponent from '@/components/Search';
import { getRecipeRecommendations } from '@/lib/api';
import { Container, Typography, Grid, Button, Paper, Box, Divider } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ClearIcon from '@mui/icons-material/Clear';

const Home: React.FC = () => {
  const { itemsList, loading, error, setItemsList } = useFetchItems();
  const [originalItemsList, setOriginalItemsList] = useState<itemType[]>([]);
  const [displayedItems, setDisplayedItems] = useState<itemType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState('');
  const [isRecipesShown, setIsRecipesShown] = useState(false);

  // Initialize originalItemsList and displayedItems once itemsList is fetched
  useEffect(() => {
    if (itemsList.length > 0) {
      setOriginalItemsList(itemsList);
      setDisplayedItems(itemsList); // Initialize displayed items as well
    }
  }, [itemsList]);

  // Filter items based on search query dynamically
  useEffect(() => {
    if (searchQuery === '') {
      setDisplayedItems(originalItemsList);
    } else {
      const filteredItems = originalItemsList.filter((item: itemType) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedItems(filteredItems);
    }
  }, [searchQuery, originalItemsList]);

  const handleAddNewItem = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (itemName: string, itemQuantity: number, imageUrl: string) => {
    const newItem = { name: itemName, quantity: itemQuantity, imageUrl };
    const docRef = await addDoc(collection(db, "pantry-tracker"), newItem);
    const newItemWithId = { ...newItem, id: docRef.id };
    setOriginalItemsList((prevItems: itemType[]) => [...prevItems, newItemWithId]); // Update originalItemsList
    setDisplayedItems((prevItems: itemType[]) => [...prevItems, newItemWithId]); // Update displayed items
    setIsModalOpen(false);
  };

  const handleAddItem = async (id: string, currentQuantity: number) => {
    const updatedQuantity = currentQuantity + 1;
    await updateDoc(doc(db, "pantry-tracker", id), { quantity: updatedQuantity });
    setOriginalItemsList((prevItems: itemType[]) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: updatedQuantity } : item
      )
    );
    setDisplayedItems((prevItems: itemType[]) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: updatedQuantity } : item
      )
    );
  };

  const handleDeleteItem = async (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      const updatedQuantity = currentQuantity - 1;
      await updateDoc(doc(db, "pantry-tracker", id), { quantity: updatedQuantity });
      setOriginalItemsList((prevItems: itemType[]) =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: updatedQuantity } : item
        )
      );
      setDisplayedItems((prevItems: itemType[]) =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: updatedQuantity } : item
        )
      );
    } else {
      await deleteDoc(doc(db, "pantry-tracker", id));
      setOriginalItemsList((prevItems: itemType[]) =>
        prevItems.filter(item => item.id !== id)
      );
      setDisplayedItems((prevItems: itemType[]) =>
        prevItems.filter(item => item.id !== id)
      );
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setDisplayedItems(originalItemsList);  // Reset to original list
  };

  const handleGetRecipes = async () => {
    if (isRecipesShown) {
      setRecipes('');
      setIsRecipesShown(false);
    } else {
      const itemNames = displayedItems.map(item => item.name);
      try {
        const recipeRecommendations = await getRecipeRecommendations(itemNames);
        setRecipes(recipeRecommendations);
        setIsRecipesShown(true);
      } catch (error) {
        console.error('Failed to get recipe recommendations', error);
      }
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
        onSearchClick={() => {}} // Optionally handle search click if needed
        onClearSearch={handleClearSearch}
        onKeyPress={(e) => { if (e.key === 'Enter') setSearchQuery(searchQuery); }} // Handle enter key if needed
      />
      <Button 
        variant='contained' 
        startIcon={isRecipesShown ? <ClearIcon /> : <RestaurantIcon />}
        sx={{ 
          bgcolor: isRecipesShown ? 'error.main' : 'primary.main', 
          color: 'white', 
          '&:hover': { bgcolor: isRecipesShown ? 'error.dark' : 'primary.dark' }, 
          my: 3 
        }} 
        onClick={handleGetRecipes}
      >
        {isRecipesShown ? 'Clear Recipes' : 'Get Recipes'}
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
        ) : displayedItems.length > 0 ? (
          displayedItems.map((item: itemType) => (
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
        ) : (
          <Typography>No items found</Typography>
        )}
      </Grid>
      <AddItemModal open={isModalOpen} handleClose={handleModalClose} handleSave={handleSave} />
    </Container>
  );
};

export default Home;

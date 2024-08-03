'use client';
import { Container, Typography, Grid } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import useFetchItems from '@/hooks/useFetchItems';
import { itemType } from '@/types';

const Home: React.FC = () => {
  const { itemsList, loading, error } = useFetchItems();

 

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
      <Typography variant="h1" sx={{color: 'primary.main', mb: 4}}>
        Pantry Tracker
      </Typography>
      <Grid 
        container 
        spacing={2} 
        sx={{ 
          width: '100%', 
          justifyContent: 'center',
        }}
      >
        {itemsList && itemsList.length > 0 ? (
          itemsList.map((item: itemType, index: number) => (
            <Grid item xs={12} sm={4} key={index}>
              <ItemCard name={item.name} details={item.quantity} />
            </Grid>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Home;

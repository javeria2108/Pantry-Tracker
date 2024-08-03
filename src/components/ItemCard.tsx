import { Box, Card, CardContent, Typography } from '@mui/material';
import CustomButton from './CustomButton';

interface ItemCardProps {
    id: string;  
  name: string;
  quantity:number
  handleAddClick: (id: string, currentQuantity: number) => void;
  handleDeleteClick: (id: string, currentQuantity: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({id, name, quantity, handleAddClick, handleDeleteClick }: ItemCardProps) => {
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
          {quantity && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 1,
              }}
            >
              {`Quantity:${quantity}`}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <CustomButton text="add" onClick={() => handleAddClick(id, quantity)}>Add</CustomButton>
          <CustomButton text="use" onClick={() => handleDeleteClick(id,quantity)}>Use</CustomButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItemCard;

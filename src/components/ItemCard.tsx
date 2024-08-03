import { Box, Card, CardContent, Typography } from '@mui/material';
import CustomButton from './CustomButton';

interface ItemCardProps {
  name: string;
  details?: string;
  handleAddClick: () => void;
  handleDeleteClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, details, handleAddClick, handleDeleteClick }: ItemCardProps) => {
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
            <CustomButton text="use" onClick={handleDeleteClick}>Use</CustomButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItemCard;

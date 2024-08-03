import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface CustomButtonProps extends ButtonProps {
  text?: 'add' | 'use';
}

const CustomButton: React.FC<CustomButtonProps> = ({  text= 'add',onClick, children, ...props }: CustomButtonProps & { children?: ReactNode }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: text === 'add' ? 'success.main' : 'info.main',
        color: 'white',
        '&:hover': {
          backgroundColor: text=== 'add' ? 'success.dark' : 'info.dark',
        },
        textTransform: 'none',
        fontWeight: 'bold',
        px: 2,
        py: 1,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
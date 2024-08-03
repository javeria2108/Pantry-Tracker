import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps {
  variant?: 'add' | 'use';
}

import { ReactNode } from 'react';

const CustomButton: React.FC<CustomButtonProps> = ({ variant = 'add', children, ...props }: CustomButtonProps & { children?: ReactNode }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: variant === 'add' ? 'success.main' : 'info.main',
        color: 'white',
        '&:hover': {
          backgroundColor: variant === 'add' ? 'success.dark' : 'info.dark',
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
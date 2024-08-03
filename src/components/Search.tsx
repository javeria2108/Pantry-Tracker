import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, MouseEvent } from 'react';

interface SearchComponentProps {
  searchQuery: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ searchQuery, onSearchChange, onSearchClick }: SearchComponentProps) => {
  return (
    <TextField
      variant="outlined"
      label="Search Items"
      value={searchQuery}
      onChange={onSearchChange}
      sx={{ mb: 4, width: '100%', maxWidth: '500px' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onSearchClick}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchComponent;

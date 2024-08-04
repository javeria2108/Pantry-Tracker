import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ChangeEvent, MouseEvent, KeyboardEvent } from 'react';

interface SearchComponentProps {
  searchQuery: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  onClearSearch: () => void;
  onKeyPress: (event: KeyboardEvent) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ searchQuery, onSearchChange, onSearchClick, onClearSearch, onKeyPress }) => {
  return (
    <TextField
      value={searchQuery}
      onChange={onSearchChange}
      onKeyPress={onKeyPress}
      placeholder="Search items"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onSearchClick}>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={onClearSearch}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchComponent;

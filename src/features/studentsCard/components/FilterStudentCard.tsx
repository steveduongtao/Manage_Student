import { Box, Button, FormControl, Grid, InputLabel, OutlinedInput, Select } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { MenuItem } from '@mui/material';
import { City, ListParams } from 'models';
import { ChangeEvent } from 'react';

export interface FilterStudentCardProps {
  onSearchChange: (newFilter: ListParams) => void;
  onChange: (newFilter: ListParams) => void;
  filter: ListParams;
  cityList: City[];
}

export function FilterStudentCard({ onSearchChange, filter, cityList, onChange }: FilterStudentCardProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  const handleCityChange = (e: any) => {
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };
  const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName"> Search by name</InputLabel>
            <OutlinedInput label="searchByName" id="searchByName" endAdornment={<Search />} onChange={handleSearchChange} />
          </FormControl>
        </Grid>
        {/* Filter by city */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select labelId="filterByCity" id="" value={filter.city || ''} label="Filter by city" onChange={handleCityChange}>
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Sort */}
        <Grid item xs={12} md={2}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="sortBy">Sort By</InputLabel>
            <Select
              labelId="sortBy"
              id="demo-controlled-open-select"
              // open={open}
              // onClose={handleClose}
              // onOpen={handleOpen}

              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              label="Sort by"
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Clear */}
        <Grid item xs={12} md={1}>
          <Button variant="outlined" color="primary" fullWidth>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

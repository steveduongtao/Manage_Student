import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import { ChangeEvent, useRef } from 'react';

export interface StudentFilterProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
  cityList: City[];
}

export default function StudentFilter({ filter, cityList, onChange, onSearchChange }: StudentFilterProps) {
  const inputRef = useRef<HTMLInputElement>();
  console.log(inputRef.current);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  const handleCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };
  const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;
    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };
  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      _city: undefined,
      name_like: undefined,
      city: undefined,
    };
    onChange(newFilter);
    // inputRef.current?.value''
    inputRef.current && (inputRef.current.value = '');
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              label="searchByName"
              id="searchByName"
              endAdornment={<Search />}
              onChange={handleSearchChange}
              defaultValue={filter.name_like || ''}
              inputRef={inputRef}
            />
          </FormControl>
        </Grid>
        {/* filter by city */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              id="demo-controlled-open-select"
              // open={open}
              // onClose={handleClose}
              // onOpen={handleOpen}
              value={filter.city || ''}
              label="Filter by city"
              onChange={handleCityChange}
            >
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
            <InputLabel id="sortBy">Sort by</InputLabel>
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
        <Grid item xs={12} md={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

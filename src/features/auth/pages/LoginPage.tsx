import { Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { authActions, selectorLogging } from '../authSlice';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function LoginPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectorLogging);
  console.log('isLoginOut', isLogging);
  const handleLoginClick = () => {
    //TODO: Get username , password from login
    //TODO: Make list of frontsize
    dispatch(
      authActions.login({
        username: '',
        password: '',
        navigate,
      })
    );
  };

  //Used to check Logged In?
  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    isLoggedIn ? navigate('/admin/dashboard') : navigate('/login');
  }, []);
  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={20} color="secondary" />}Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

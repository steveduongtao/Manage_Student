import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import { Outlet } from 'react-router-dom';

export interface AdminLayoutProps {}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  main: {
    gridArea: 'main',
    padding: theme.spacing(2, 3),
  },
}));
export const AdminLayou = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header></Header>
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar></Sidebar>
      </Box>
      <Box className={classes.main}>
        <Outlet />
      </Box>
    </Box>
  );
};

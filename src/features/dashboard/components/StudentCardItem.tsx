import { Box, Grid, makeStyles } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'app/hooks';
import { selectCityMap } from 'features/city/citySlice';
import { Student } from 'models';
import { capitalizeString, getMarkColor, stringAvatar } from 'utils';
export interface IStudentCardItemProps {
  studentCard: Student;
  statistic: { [key: string]: number };
}

const useStyles = makeStyles((them) => ({
  flex_align: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export function StudentCardItem({ studentCard, statistic }: IStudentCardItemProps) {
  const classes = useStyles();

  const selectCity = useAppSelector(selectCityMap);
  return (
    <Grid item xs={12} md={6} lg={3} xl={3}>
      <Card variant="outlined">
        <CardContent style={{ paddingBottom: '0' }}>
          <Box className={classes.flex_align}>
            <Typography gutterBottom variant="h5" component="div">
              {studentCard?.name}
            </Typography>
            <Avatar {...stringAvatar(studentCard?.name, Number(studentCard?.mark))}></Avatar>
          </Box>

          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {capitalizeString(studentCard?.gender)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectCity[studentCard?.city]?.name || 'Unknow'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Box color={getMarkColor(Number(studentCard?.mark))}>
                <b>{studentCard?.mark}</b>
              </Box>
            </Typography>
          </Box>
        </CardContent>
        <CardActions className={classes.flex_align}>
          <Button variant="outlined" size="small">
            Edit
          </Button>
          <Button variant="outlined" color="error" size="small">
            Delete
          </Button>
          <Avatar variant="rounded" sx={{ bgcolor: 'red', fontSize: '15px', height: '31px' }}>
            <p>
              {statistic[studentCard.id || 'unknown']}
              <sup>st</sup>
            </p>
          </Avatar>
        </CardActions>
      </Card>
    </Grid>
  );
}

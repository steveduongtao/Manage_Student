import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Student } from 'models';
export interface IStudentCardItemProps {
  studentCard: Student;
}

export function StudentCardItem({ studentCard }: IStudentCardItemProps) {
  return (
    <Grid item xs={12} md={6} lg={3} xl={3}>
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://invisiblechildren.com/wp-content/uploads/2012/07/facebook-profile-picture-no-pic-avatar-300x188.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {studentCard?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {studentCard?.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {studentCard?.city || 'Unknow'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {studentCard?.mark}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

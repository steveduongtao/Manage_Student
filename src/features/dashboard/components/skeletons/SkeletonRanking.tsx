import { Grid } from '@material-ui/core';
import { Skeleton } from '@mui/material';

export function SkeletonRanking() {
  return (
    <Grid item xs={12} md={6} lg={3} xl={3}>
      <Skeleton variant="rectangular" animation="wave" width="100%" height="280.5px  " />
    </Grid>
  );
}

import { Box, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { ChatBubble, LineStyleRounded, Wallpaper } from '@material-ui/icons';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import Charts from './chart/Charts';
import { SkeletonRanking, SkeletonStatistic } from './components/skeletons';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import GradingIcon from '@mui/icons-material/Grading';
import GppBadIcon from '@mui/icons-material/GppBad';

import { selectStudentList } from 'features/student/studentSlice';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    top: '3px',
    width: '100%',
  },
}));

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);
  const studentList = useAppSelector(selectStudentList);

  const classes = useStyles();
  console.log(43, {
    loading,
    statistics,
    highestStudentList,
    lowestStudentList,
    rankingByCityList,
    studentList,
  });

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}
      {/* Statistic Section */}
      <Grid container spacing={3}>
        {loading ? (
          <SkeletonStatistic />
        ) : (
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <StatisticItem
              icon={<ManIcon fontSize="large" color="primary" />}
              label="male"
              value={statistics.maleCount}
            ></StatisticItem>
          </Grid>
        )}
        {loading ? (
          <SkeletonStatistic />
        ) : (
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <StatisticItem
              icon={<WomanIcon fontSize="large" color="primary" />}
              label="female"
              value={statistics.femaleCount}
            ></StatisticItem>
          </Grid>
        )}
        {loading ? (
          <SkeletonStatistic />
        ) : (
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <StatisticItem
              icon={<GradingIcon fontSize="large" color="primary" />}
              label="mark >= 8"
              value={statistics.highMarkCount}
            ></StatisticItem>
          </Grid>
        )}
        {loading ? (
          <SkeletonStatistic />
        ) : (
          <Grid item xs={12} md={6} lg={3} xl={3}>
            <StatisticItem
              icon={<GppBadIcon fontSize="large" color="primary" />}
              label="mark <=5"
              value={statistics.lowMarkCount}
            ></StatisticItem>
          </Grid>
        )}
      </Grid>

      {/* Chart */}
      <Grid container spacing={3} style={{ marginTop: '16px' }}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Charts statistics={statistics} rankingByCityList={rankingByCityList}></Charts>
        </Grid>
      </Grid>

      {/* All students rankings */}
      <Box mt={4}>
        <Typography variant="h4">All Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {loading ? (
              <SkeletonRanking />
            ) : (
              <Grid item xs={12} md={6} lg={3} xl={3}>
                <Widget title="Student with highest mark">
                  <StudentRankingList studentList={highestStudentList} />
                </Widget>
              </Grid>
            )}
            {loading ? (
              <SkeletonRanking />
            ) : (
              <Grid item xs={12} md={6} lg={3} xl={3}>
                <Widget title="Student with lowest mark">
                  <StudentRankingList studentList={lowestStudentList} />
                </Widget>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      {/* Ranking by city */}
      <Box mt={4}>
        <Typography variant="h4">Ranking by cities</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <>
                {!loading ? (
                  <Grid key={ranking.cityId} item xs={12} md={6} lg={3} xl={3}>
                    <Widget title={ranking.cityName}>
                      <StudentRankingList studentList={ranking.rankingList} />
                    </Widget>
                  </Grid>
                ) : (
                  <SkeletonRanking />
                )}
              </>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

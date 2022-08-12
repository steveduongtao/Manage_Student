import { Grid } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { StudentCardItem } from 'features/dashboard/components/StudentCardItem';
import { selectRankingStudentList } from 'features/dashboard/dashboardSlice';
import { Student } from 'models';

export interface StudentCardLayoutProps {
  studentCardList: Student[];
}

export function StudentCardLayout({ studentCardList }: StudentCardLayoutProps) {
  const statistic = useAppSelector(selectRankingStudentList);
  console.log(16, statistic);

  return (
    <Grid container spacing={3}>
      {studentCardList.map((studentCard) => (
        <StudentCardItem studentCard={studentCard} statistic={statistic} />
      ))}
    </Grid>
  );
}

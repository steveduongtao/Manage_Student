import { Grid } from '@material-ui/core';
import { StudentCardItem } from 'features/dashboard/components/StudentCardItem';
import { Student } from 'models';

export interface StudentCardLayoutProps {
  studentCardList: Student[];
}

export function StudentCardLayout({ studentCardList }: StudentCardLayoutProps) {
  console.log(15, studentCardList);
  return (
    <Grid container spacing={3}>
      {studentCardList.map((studentCard) => (
        <StudentCardItem studentCard={studentCard} />
      ))}
    </Grid>
  );
}

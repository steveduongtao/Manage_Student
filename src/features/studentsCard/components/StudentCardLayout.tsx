import { Grid } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { StudentCardItem } from 'features/dashboard/components/StudentCardItem';
import { selectRankingStudentList } from 'features/dashboard/dashboardSlice';
import { Student } from 'models';
import { useState } from 'react';

export interface StudentCardLayoutProps {
  studentCardList: Student[];
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export function StudentCardLayout({ studentCardList, onEdit, onRemove }: StudentCardLayoutProps) {
  const statistic = useAppSelector(selectRankingStudentList);
  console.log(16, statistic);

  return (
    <Grid container spacing={3}>
      {studentCardList.map((studentCard, index: number) => (
        <StudentCardItem key={index} studentCard={studentCard} statistic={statistic} onEdit={onEdit} onRemove={onRemove} />
      ))}
    </Grid>
  );
}

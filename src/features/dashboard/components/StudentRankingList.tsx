import { Box } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Student } from 'models';
import { getMarkColor } from 'utils';
export interface StudentRankingListProps {
  studentList: Student[];
}

export default function StudentRankingList({ studentList }: StudentRankingListProps) {
  return (
    <TableContainer>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>

            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="right">
                <Box color={getMarkColor(Number(student.mark))} fontWeight="bold">
                  {student.mark}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

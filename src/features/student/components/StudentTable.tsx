import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { City, Student } from 'models';
import { useState } from 'react';
import { capitalizeString, getMarkColor, stringAvatar } from 'utils';
export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onRemove?: (student: Student) => void;
  onEdit?: (student: Student) => void;
}

export default function StudentTable({ studentList, cityMap, onRemove, onEdit }: StudentTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };
  console.log('studentList', studentList);
  const handleRemoveClick = (student: Student) => {
    //Set selected student.
    //Show confirm dialog.
    setSelectedStudent(student);
    setOpen(true);
  };
  const handleRemoveConfirm = (student: Student) => {
    //Call  onRemove
    onRemove?.(student);
    //Close dialog
    setOpen(false);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell width="240px">ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.length === 0 && <em>No data to show</em>}
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar {...stringAvatar(student.name, Number(student.mark))} />
                  &nbsp; {student.name}
                </TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(Number(student.mark))} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name || 'Unknow'}</TableCell>
                <TableCell align="right">
                  <Button size="small" color="primary" onClick={() => onEdit?.(student)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => {
                      handleRemoveClick(student);
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student name "{selectedStudent?.name}".
            <br /> This action can't be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => handleRemoveConfirm(selectedStudent as Student)} autoFocus color="secondary" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

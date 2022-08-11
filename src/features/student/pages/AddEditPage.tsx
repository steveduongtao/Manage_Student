import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log('Fail to fetch student details', error);
      }
    })();
  }, [studentId]);
  console.log(student);

  const handleStudentFormSubmit = async (formValue: Student) => {
    //TODO: Handle submit here, call Api to add/update student.
    if (isEdit) {
      await studentApi.update(formValue);
    } else {
      await studentApi.add(formValue);
    }
    //Toast cuccess
    toast.success('Save student successfully');
    //Redirect to student list
    navigate('/admin/students/list');
  };

  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  };

  return (
    <Box>
      <Link to="/admin/students/list">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft />
          &nbsp; Back to student
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}

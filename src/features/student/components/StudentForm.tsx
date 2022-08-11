import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup
      .string()
      .required('please enter name.')
      .test('to-words', 'Please enter at least two words', (value) => {
        if (!value) return true;
        const parts = value?.split(' ') || [];
        return parts.filter((x) => !!x).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .integer('Please enter an integer.')
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .typeError('please enter a valid number')
      .required('Please enter age'),
    mark: yup
      .number()
      .positive('Please enter a positive number.')
      .min(0, 'Min is 0.')
      .max(10, 'Max is 10.')
      .typeError('please enter a valid number')
      .required('Please enter mark'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either "male" or "female"')
      .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
  })
  .required();

export interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValue: Student) => void;
}

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<any>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    console.log('Submit', formValues);
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      console.log('Fail to add/update student');
      //Toast error add/update failed
      toast.error('Add/update error !');
    }
  };

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* FORM FIELDS */}
        <InputField name="name" control={control} label="Full Name" />
        {/* <InputField name="gender" control={control} label="Gender" /> */}

        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { lable: 'Male', value: 'male' },
            { lable: 'Female', value: 'female' },
          ]}
        />

        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <SelectField name="city" control={control} label="City" options={cityOptions} />
        <Box mr={3}>
          <Button variant="contained" type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={12} color="primary" />} Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

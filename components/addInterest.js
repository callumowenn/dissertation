import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useInterests } from '../lib/interests';

function AddInterest() {
  const { addInterest } = useInterests();

  return (
    <Formik
      initialValues={{ interest: '' }}
      onSubmit={({ interest }) => {
        addInterest(interest);
      }}
    >
      {() => (
        <Form>
          <Field name="interest">
            {({ field, form }) => (
              <FormControl
                isRequired
                mt={8}
                isInvalid={form.errors.interest && form.touched.interest}
              >
                <FormLabel htmlFor="interest">Interest</FormLabel>
                <Select {...field} id="interest" placeholder="Select interest">
                  <option value="climbing">Climbing</option>
                  <option value="nature">Nature</option>
                  <option value="food">Food</option>
                </Select>
                <FormErrorMessage>{form.errors.interest}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button mt="4" type="submit">
            Add Interest
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddInterest;

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useInterests } from '../../lib/interests';

function AddInterestForm() {
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
                mt="4"
                isInvalid={form.errors.interest && form.touched.interest}
              >
                <FormLabel htmlFor="interest">Interest</FormLabel>
                <Select {...field} id="interest" placeholder="Select interest">
                  <option value="climbing">Climbing</option>
                  <option value="nature">Nature</option>
                  <option value="food">Food</option>
                  <option value="space">Space</option>
                  <option value="football">Football</option>
                  <option value="travel">Travel</option>
                </Select>
                <FormErrorMessage>{form.errors.interest}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button colorScheme="blue" mt="4" type="submit">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddInterestForm;

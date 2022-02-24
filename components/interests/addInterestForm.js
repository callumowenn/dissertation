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
      initialValues={{ interest: '', emoji: '', colour: '' }}
      onSubmit={({ interest, emoji, colour }) => {
        addInterest(interest, emoji, colour);
        console.log(interest, emoji, colour);
      }}
    >
      {() => (
        <Form>
          <Field name="interest">
            {({ field, form }) => (
              <FormControl
                isRequired
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
          <Field name="emoji">
            {({ field, form }) => (
              <FormControl
                isRequired
                mt="4"
                isInvalid={form.errors.emoji && form.touched.emoji}
              >
                <FormLabel htmlFor="emoji">Emoji</FormLabel>
                <Select {...field} id="emoji" placeholder="Select emoji">
                  <option value="🧗">🧗</option>
                  <option value="🌱">🌱</option>
                  <option value="🥗">🥗</option>
                  <option value="🚀">🚀</option>
                  <option value="⚽️">⚽️</option>
                  <option value="🗺">🗺</option>
                </Select>
                <FormErrorMessage>{form.errors.emoji}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="colour">
            {({ field, form }) => (
              <FormControl
                isRequired
                mt="4"
                isInvalid={form.errors.colour && form.touched.colour}
              >
                <FormLabel htmlFor="colour">Colour</FormLabel>
                <Select {...field} id="colour" placeholder="Select colour">
                  <option value="#EB8E8E">Red</option>
                  <option value="#B7EB8E">Green</option>
                  <option value="#EBCB8E">Orange</option>
                  <option value="#FF9BDC">Pink</option>
                  <option value="#8EC0EB">Blue</option>
                  <option value="#FFF577">Yellow</option>
                </Select>
                <FormErrorMessage>{form.errors.colour}</FormErrorMessage>
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

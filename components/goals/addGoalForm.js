import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { usePodGoals } from '../../lib/podGoals';

function AddGoal() {
  const { addGoal } = usePodGoals();

  return (
    <Formik
      initialValues={{ goal: '', emoji: '', colour: '' }}
      onSubmit={({ goal, emoji, colour }) => {
        addGoal(goal, emoji, colour);
        console.log(goal, emoji, colour);
      }}
    >
      {() => (
        <Form>
          <Field name="goal">
            {({ field, form }) => (
              <FormControl
                isRequired
                mt="4"
                isInvalid={form.errors.goal && form.touched.goal}
              >
                <FormLabel htmlFor="goal">Goal</FormLabel>
                <Input {...field} id="goal" placeholder="Select goal" />
                <FormErrorMessage>{form.errors.goal}</FormErrorMessage>
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

export default AddGoal;

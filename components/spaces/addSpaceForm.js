import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { usePodSpaces } from '../../lib/podSpaces';
import { usePodInterests } from '../../lib/podInterests';

function AddSpaceForm({ space, update }) {
  const { addSpace } = usePodSpaces();
  const { interests } = usePodInterests();

  return (
    <Formik
      initialValues={{
        space: space?.name ?? '',
        emoji: space?.emoji ?? '',
        colour: space?.colour ?? '',
        interest: space?.interest ?? '',
      }}
      onSubmit={({ space, emoji, colour, interest }) => {
        update
          ? console.log('update!')
          : addSpace(space, emoji, colour, interest);
      }}
    >
      {() => (
        <Form>
          <Field name="space">
            {({ field, form }) => (
              <FormControl
                isRequired
                mt="4"
                isInvalid={form.errors.space && form.touched.space}
              >
                <FormLabel htmlFor="space">Name</FormLabel>
                <Input
                  {...field}
                  id="space"
                  placeholder="e.g. My Favourite Space"
                />
                <FormErrorMessage>{form.errors.space}</FormErrorMessage>
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
                <Input {...field} id="emoji" placeholder="Enter emoji..." />
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
          <Field name="interest">
            {({ field, form }) => (
              <FormControl
                isRequired
                mt="4"
                isInvalid={form.errors.interest && form.touched.interest}
              >
                <FormLabel htmlFor="interest">Interest</FormLabel>
                <Select {...field} id="interest" placeholder="Select interest">
                  {interests.map((interest) => (
                    <option value={interest.name}>{interest.name}</option>
                  ))}
                </Select>
                <FormErrorMessage>{form.errors.interest}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button colorScheme={update ? 'green' : 'blue'} mt="4" type="submit">
            {update ? 'Update' : 'Add'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddSpaceForm;

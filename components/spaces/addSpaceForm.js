import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { usePodSpaces } from '../../lib/podSpaces';
import { usePodInterests } from '../../lib/podInterests';
import { getInterestFromName } from '../../utils/interests';
import { useState } from 'react';

function AddSpaceForm({ space, update }) {
  const { addSpace, spaces } = usePodSpaces();
  const { interests } = usePodInterests();
  const [weightingsState, setWeightingsState] = useState([]);

  return (
    <Formik
      initialValues={{
        space: space?.name ?? '',
        emoji: space?.emoji ?? '',
        colour: space?.colour ?? '',
        interests: space?.interests ?? [],
        weightings: space?.weightings ?? [],
      }}
      onSubmit={({ space, emoji, colour }) => {
        update
          ? console.log('update!')
          : console.log(space, emoji, colour, weightingsState);
        addSpace(space, emoji, colour, weightingsState);
      }}
    >
      {(form) => (
        <Form>
          <Field name="space">
            {({ field }) => (
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
          <Flex gap="4">
            <Field name="emoji">
              {({ field }) => (
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
              {({ field }) => (
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
          </Flex>
          <Field name="interests">
            {({ field }) => (
              <FormControl
                mt="4"
                isInvalid={form.errors.interests && form.touched.interests}
              >
                <FormLabel htmlFor="interests">Interests</FormLabel>
                <Flex overflowX="scroll">
                  <Flex>
                    {interests.map((interest) => (
                      <>
                        <Checkbox
                          {...field}
                          id="interests"
                          m="1"
                          transition="0.2s"
                          color={interest.colour}
                          style={{ opacity: '0.3' }}
                          _checked={{ opacity: '1 !important' }}
                          isChecked={
                            update
                              ? spaces
                                  ?.find((x) => x.name === form.values.space)
                                  ?.interests.find(
                                    (x) => x === interest.name
                                  ) !== undefined
                              : form.values.interests.find(
                                  (x) => x === interest
                                )
                          }
                          onMouseUp={() => {
                            if (
                              weightingsState.find(
                                (obj) => obj.name === interest.name
                              )
                            ) {
                              // remove from weightings state
                              setWeightingsState((state) => {
                                const list = state.filter(
                                  (item) => item.name !== interest.name
                                );
                                return list;
                              });
                            } else {
                              // add with default value 50
                              setWeightingsState((state) => {
                                const list = [
                                  ...state,
                                  { name: interest.name, weighting: 50 },
                                ];
                                return list;
                              });
                            }
                          }}
                          size="lg"
                          flexDirection="column-reverse"
                          value={interest.name}
                        >
                          <Center
                            bg={interest.colour}
                            color="black"
                            px="8"
                            mb="2"
                            h="64px"
                            borderRadius="2xl"
                            overflow="hidden"
                          >
                            <Center pos="relative">
                              <Text zIndex="1" fontWeight="semibold">
                                {interest.name}
                              </Text>
                              <Text
                                pos="absolute"
                                right="0"
                                opacity="0.2"
                                fontSize="8xl"
                              >
                                {interest.emoji}
                              </Text>
                            </Center>
                          </Center>
                        </Checkbox>
                      </>
                    ))}
                  </Flex>
                </Flex>
              </FormControl>
            )}
          </Field>
          <Field name="weightings">
            {({ field }) =>
              form.values.interests.length > 0 ? (
                <FormControl
                  mt="4"
                  isInvalid={form.errors.weightings && form.touched.weightings}
                >
                  <FormLabel htmlFor="weightings">Weightings</FormLabel>
                  {form.values.interests?.map((interest, index) => (
                    <>
                      <Center
                        bg={getInterestFromName(interest, interests).colour}
                        color="black"
                        p="4"
                        w="max"
                        borderRadius="2xl"
                        overflow="hidden"
                      >
                        <Center pos="relative">
                          <Text zIndex="1" fontWeight="semibold">
                            {getInterestFromName(interest, interests).name}
                          </Text>
                          <Text
                            pos="absolute"
                            right="0"
                            opacity="0.2"
                            fontSize="8xl"
                          >
                            {getInterestFromName(interest, interests).emoji}
                          </Text>
                        </Center>
                      </Center>
                      <Slider
                        aria-label="slider-ex-1"
                        defaultValue={
                          update
                            ? spaces.find((x) => x.name === form.values.space)
                                ?.weightings[index]
                            : 50
                        }
                        mb="4"
                        id="weightings"
                        onChangeEnd={(value) => {
                          if (
                            weightingsState.filter(
                              (obj) => obj.name === interest
                            ).length > 0
                          ) {
                            // exists
                            setWeightingsState((state) => {
                              const list = state.map((item) => {
                                if (item.name === interest) {
                                  return { name: interest, weighting: value };
                                } else {
                                  return item;
                                }
                              });
                              return list;
                            });
                          } else {
                            // create
                            setWeightingsState((state) => {
                              const list = [
                                ...state,
                                { name: interest, weighting: value },
                              ];
                              return list;
                            });
                          }
                        }}
                      >
                        <SliderTrack>
                          <SliderFilledTrack
                            style={{
                              background: getInterestFromName(
                                interest,
                                interests
                              ).colour,
                            }}
                          />
                        </SliderTrack>
                        <SliderMark value={0} mt="1" fontSize="xs">
                          Less
                        </SliderMark>
                        <SliderMark value={100} mt="1" ml="-7" fontSize="xs">
                          More
                        </SliderMark>
                        <SliderThumb />
                      </Slider>
                    </>
                  ))}
                </FormControl>
              ) : null
            }
          </Field>
          <Button
            colorScheme={update ? 'green' : 'blue'}
            mt="4"
            type="submit"
            isDisabled={form.values.interests.length < 1}
          >
            {update ? 'Update' : 'Add'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddSpaceForm;

import { Button } from '@chakra-ui/react';
import { getSolidDataset, getThing, getUrlAll } from '@inrupt/solid-client';
import { useSession } from '@inrupt/solid-ui-react';
import { useEffect, useState } from 'react';
import { getOrCreateTodoList } from '../utils/dataset';

function AddInterest() {
  return <Button mt="4">Add Interest</Button>;
}

export default AddInterest;

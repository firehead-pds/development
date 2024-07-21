import { useAppSelector } from '../../app/hook.ts';
import { selectCurrentUser } from '../../features/auth/authSlice.ts';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
} from '@chakra-ui/react';
import { useCreateWingMutation } from '../../features/wing/wingApiSlice.ts';
import { SubmitHandler, useForm } from 'react-hook-form';

interface CreateWingFormFields {
  wingName: string;
}

export default function Dashboard() {
  const user = useAppSelector(selectCurrentUser);
  const [wing, { isLoading }] = useCreateWingMutation();

  const { register, handleSubmit } = useForm<CreateWingFormFields>();
  const onSubmit: SubmitHandler<CreateWingFormFields> = async (data) => {
    try {
      await wing(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user?.firstName + ' ' + user?.lastName}
      <br />
      <br />
      <form
        id={'createWingForm'}
        onSubmit={handleSubmit(onSubmit)}
        className={'p-4 border rounded-lg mx-2 w-[500px]'}
        noValidate
      >
        <FormControl isRequired>
          <FormLabel htmlFor="wingName">Wing Name:</FormLabel>
          <Input id="wingName" type="text" {...register('wingName')}></Input>
        </FormControl>
        <Button isLoading={isLoading} type={'submit'} form={'createWingForm'}>
          Create
        </Button>
      </form>
      <br />
      {user?.wingsInfo?.map((wing) => {
        return (
          <Box className={'p-4 border rounded-lg mx-2 w-[500px]'}>
            <Link as={ReactRouterLink} to={`/app/wing/${wing.id}`}>
              {wing.id}
            </Link>
            {wing.role}
          </Box>
        );
      })}
    </>
  );
}

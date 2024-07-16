import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useCreateWingMutation } from '../../features/wing/wingApiSlice.ts';
import { SubmitHandler, useForm } from 'react-hook-form';

interface CreateWingFormFields {
  wingName: string;
}

export default function Wing() {
  const { register, handleSubmit } = useForm<CreateWingFormFields>();

  const [wing] = useCreateWingMutation();
  const onSubmit: SubmitHandler<CreateWingFormFields> = async (data) => {
    try {
      await wing(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        className={'w-screen my-6'}
      >
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
          <Button
            isLoading={wing.isLoading}
            type={'submit'}
            form={'createWingForm'}
          >
            Create
          </Button>
        </form>
      </Flex>
    </>
  );
}

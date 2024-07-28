import { useNavigate, useParams } from 'react-router-dom';
import {
  useJoinWingMutation,
  useLazyValidateInviteQuery,
} from '../../../features/wing/wingApiSlice.ts';
import { Button, Spinner } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export default function JoinWing() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [validate, { isLoading }] = useLazyValidateInviteQuery();
  if (!token) {
    console.error('Could not load token');
    navigate('app/dashboard');
    return;
  }

  const wing = validate(token).unwrap();
  console.log(wing);
  const [joinWing] = useJoinWingMutation();
  const {
    handleSubmit,
    formState: { isLoading: formLoading },
  } = useForm();
  const onSubmit = async () => {
    try {
      joinWing({ token: token});
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <form
        id={'joinWing'}
        onSubmit={handleSubmit(onSubmit)}
        className={'p-4 border rounded-lg mx-2 w-[500px]'}
        noValidate
      >
        <Button
          type={'submit'}
          isLoading={formLoading}
          size={'xl'}
          form={'joinWing'}
        >
          Join
        </Button>
      </form>
    </>
  );
}

import { useNavigate, useParams } from 'react-router-dom';
import {
  useJoinWingMutation,
  useValidateInviteQuery,
} from '../../../features/wing/wingApiSlice.ts';
import { Button, Spinner } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export default function JoinWing() {
  const navigate = useNavigate();
  const { token } = useParams();
  if (!token) {
    console.error('Could not load token');
    navigate('app/dashboard');
    return;
  }
  const { data } = useValidateInviteQuery({ token: token });
  const [joinWing] = useJoinWingMutation();
  const {
    handleSubmit,
    formState: { isLoading },
  } = useForm();
  const onSubmit = async () => {
    try {
      joinWing({ token: token });
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/app/dashboard');
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
        <Button type={'submit'} size={'xl'} form={'createWingForm'}>
          Join
        </Button>
      </form>
    </>
  );
}

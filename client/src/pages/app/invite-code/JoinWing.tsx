import { useNavigate, useParams } from 'react-router-dom';
import {
  useJoinWingMutation,
  useLazyValidateInviteQuery,
} from '../../../features/wing/wingApiSlice.ts';
import {Button, Spinner, useToast} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import {Wing} from "../../../features/auth/authSlice.ts";

export default function JoinWing() {
  const toast = useToast();

  const navigate = useNavigate();
  const { token } = useParams();
  const [validate, { isLoading }] = useLazyValidateInviteQuery();
  const [wing, setWing] = useState<Wing>();
  const [joinWing] = useJoinWingMutation();


  if (!token) {
    console.error('Could not load token');
    navigate('/app/dashboard');
    return;
  }

  useEffect(() => {
    validate(token)
        .unwrap()
        .then((res) => {
          setWing(res);
        })
        .catch((e) => {
          console.error('invite invalid');
          console.error(e);
          navigate('/app/dashboard');
        });
  }, [token]);

  const {
    handleSubmit,
    formState: { isLoading: formLoading },
  } = useForm();

  const onSubmit = async () => {
    try {
      await joinWing({ token: token}).unwrap();
      navigate(`/app/wing/${wing?.id}`);
    } catch (error) {
      toast({
        title: 'Unable to Join',
        description: 'You are already a member of this wing',
        status: 'error',
        variant: 'left-accent',
        duration: 8000,
        isClosable: true,
      });
      navigate('/app/dashboard');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <p>{wing && wing.name}</p>
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

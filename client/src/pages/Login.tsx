import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import LoginFormFields from '../interfaces/login/LoginFormFields.ts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useApiMutate from '../hooks/fetching/useApiMutation.tsx';
import { useAppDispatch } from '../hook.ts';
import { login } from '../loginSlice.ts';

export default function Login() {
  const { t } = useTranslation('login', {
    keyPrefix: 'fields',
  });
  const { t: tError } = useTranslation('common', {
    keyPrefix: 'forms.validationErrors',
  });
  const { t: tCommon } = useTranslation('common', {
    keyPrefix: 'forms',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    mode: 'onSubmit',
  });

  const errorToast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutateAsync } = useApiMutate({
    mutationKey: ['log-in'],
    endpoint: 'log-in',
    method: 'POST',
    onSuccess: (_res) => {
      if (Object.keys(errors).length === 0) {
        navigate('/');
      }
    },
    onError: async (error) => {
      console.log(error);
      errorToast({
        title: 'There was an error connecting to the server.',
        description: 'Try again later.',
        status: 'error',
        variant: 'left-accent',
        duration: 8000,
        isClosable: true,
      });
    },
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    dispatch(login());
    await mutateAsync(data);
  };

  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        className={'w-screen my-6'}
      >
        <form
          id={'loginForm'}
          onSubmit={handleSubmit(onSubmit)}
          className={'p-4 border rounded-lg mx-2 w-[500px]'}
          noValidate
        >
          <FormControl isInvalid={!!errors.userEmail}>
            <FormLabel htmlFor="email">{t('email.label')}</FormLabel>
            <Input
              id="email"
              placeholder={t('email.placeholder')}
              {...register('userEmail', {
                required: tError('required'),
                pattern: {
                  value: /^\S+@\S+[.]\S+$/i,
                  message: tError('invalid', {
                    field: t('email.name'),
                  }),
                },
              })}
            />
            <FormErrorMessage>
              {errors.userEmail && errors.userEmail.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.userPassword}>
            <FormLabel htmlFor="password">{t('password.label')}</FormLabel>
            <Input
              id={'password'}
              placeholder={t('password.placeholder')}
              {...register('userPassword', {
                required: tError('required'),
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,24}$/,
                  message: tError('invalid', {
                    field: t('password.name'),
                  }),
                },
              })}
            />
            <FormErrorMessage>
              {errors.userPassword && errors.userPassword.message}
            </FormErrorMessage>
          </FormControl>
          <Button isLoading={isSubmitting} type="submit" form={'loginForm'}>
            {tCommon('submit')}
          </Button>
        </form>
      </Flex>
    </>
  );
}
//

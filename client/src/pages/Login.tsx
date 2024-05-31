import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import LoginFormFields from '../interfaces/login/LoginFormFields.ts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApiSlice.ts';
import { useAppDispatch } from '../hook.ts';
import { setCredentials } from '../features/auth/authSlice.ts';

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
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    mode: 'onSubmit',
  });
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res.data));
    } catch (e) {
      if (e.status === 401) {
        setError('invalidCredentialsError', {
          // TODO Igor, fix this and put a translation
          message: 'Invalid Credentials',
        });
      }
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
          id={'loginForm'}
          onSubmit={handleSubmit(onSubmit)}
          className={'p-4 border rounded-lg mx-2 w-[500px]'}
          noValidate
        >
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">{t('email.label')}</FormLabel>
            <Input
              id="email"
              placeholder={t('email.placeholder')}
              {...register('email', {
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
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">{t('password.label')}</FormLabel>
            <Input
              id={'password'}
              placeholder={t('password.placeholder')}
              {...register('password', {
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
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          {errors.invalidCredentialsError &&
            errors.invalidCredentialsError.message}
          <Button isLoading={isSubmitting} type="submit" form={'loginForm'}>
            {tCommon('submit')}
          </Button>
        </form>
      </Flex>
    </>
  );
}

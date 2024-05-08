import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import AddressInfo from '../components/signup/AddressInfo.tsx';
import MeasurementsInfo from '../components/signup/MeasurementsInfo.tsx';
import PersonalInfo from '../components/signup/PersonalInfo.tsx';
import AccessCredentials from '../components/signup/AccessCredentials.tsx';
import SignupFormFields from '../interfaces/signup/SignupFormFields.ts';
import PostUsers from '../interfaces/backend-fetches/requests/users/PostUsers.ts';
import ErrorResponse from '../interfaces/backend-fetches/responses/ErrorResponse.ts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {
  const { t } = useTranslation('signup');
  const { t: tCommon } = useTranslation('common', {
    keyPrefix: 'forms',
  });

  const errorToast = useToast();
  const navigate = useNavigate();

  const [isFetchingPostalCode, setIsFetchingPostalCode] = useState(false);
  const setIsFetchingPostalCodeHandler = (value: boolean) => {
    setIsFetchingPostalCode(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    getValues,
    trigger,
    watch,
  } = useForm<SignupFormFields>({
    mode: 'onBlur',
    defaultValues: {
      address: {
        noAddressNumber: false,
      },
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ['sendSignupData'],
    mutationFn: async (formData: PostUsers) => {
      const res = await fetch(`${import.meta.env.VITE_BASE_API_URL!}/users`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        if (res.status === 409) {
          const data = (await res.json()) as ErrorResponse;

          if (data.message === 'cpf already in use') {
            setError(
              'cpf',
              {
                type: 'custom',
                message: tCommon('validationErrors.alreadyInUse', {
                  field: t('fields.personalInfo.cpf.name'),
                }),
              },
              { shouldFocus: true },
            );
            return;
          }

          if (data.message === 'email already in use') {
            setError(
              'email',
              {
                type: 'custom',
                message: tCommon('validationErrors.alreadyInUse', {
                  field: t('fields.accessCredentials.email.name'),
                }),
              },
              { shouldFocus: true },
            );
            return;
          }
        }

        throw new Error(
          `Fetch request failed: ${res.status} ${res.statusText}`,
        );
      }
    },
    onSuccess: () => {
      if (Object.keys(errors).length === 0) {
        navigate('/');
      }
    },
    onError: () => {
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

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete data.confirmPassword;
    data.cpf = data.cpf.replace(/\./, '').replace('-', '');

    if (data.address.noAddressNumber) {
      delete data.address.addressNumber;
    }

    delete data.address.noAddressNumber;
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
          id={'signupForm'}
          onSubmit={handleSubmit(onSubmit)}
          className={'p-4 border rounded-lg mx-2 w-[500px]'}
          noValidate
        >
          <Box position="relative" paddingY="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={'text-center'}>
              {t('dividers.personalInfo')}
            </AbsoluteCenter>
          </Box>
          <PersonalInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />

          <Box position="relative" paddingY="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={'text-center'}>
              {t('dividers.accessCredentials')}
            </AbsoluteCenter>
          </Box>
          <AccessCredentials
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
          />

          <Box position="relative" paddingY="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={'text-center'}>
              {t('dividers.measurements')}
            </AbsoluteCenter>
          </Box>
          <MeasurementsInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />

          <Box position="relative" paddingY="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={'text-center'}>
              {t('dividers.address')}
            </AbsoluteCenter>
          </Box>
          <AddressInfo
            register={register}
            errors={errors}
            setIsFetchingPostalCode={setIsFetchingPostalCodeHandler}
            setError={setError}
            setValue={setValue}
            getValues={getValues}
            trigger={trigger}
            watch={watch}
          />
          <Button
            isLoading={isSubmitting || isFetchingPostalCode}
            type="submit"
            form={'signupForm'}
          >
            {tCommon('submit')}
          </Button>
        </form>
      </Flex>
    </>
  );
}

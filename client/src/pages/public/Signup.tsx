import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  useToast,
} from '@chakra-ui/react';
import AddressInfo from '../../components/signup/AddressInfo.tsx';
import MeasurementsInfo from '../../components/signup/MeasurementsInfo.tsx';
import PersonalInfo from '../../components/signup/PersonalInfo.tsx';
import AccessCredentials from '../../components/signup/AccessCredentials.tsx';
import SignupFormFields from '../../interfaces/signup/SignupFormFields.ts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSignupMutation } from '../../features/signup/signupApiSlice.ts';

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
    resetField,
  } = useForm<SignupFormFields>({
    mode: 'onBlur',
    defaultValues: {
      address: {
        noAddressNumber: false,
      },
    },
  });

  const [signup] = useSignupMutation();

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    delete data.confirmPassword;
    data.cpf = data.cpf.replace(/\./g, '').replace('-', '');

    if (data.address.noAddressNumber) {
      delete data.address.addressNumber;
    }
    delete data.address.noAddressNumber;

    try {
      await signup(data).unwrap();
      navigate('/');
    } catch (error: any) {
      if (error.status === 409) {
        const data = error.data;
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

      errorToast({
        title: 'There was an error connecting to the server.',
        description: 'Try again later.',
        status: 'error',
        variant: 'left-accent',
        duration: 8000,
        isClosable: true,
      });
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
            resetField={resetField}
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

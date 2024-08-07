import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useState } from 'react';
import SignupFormFields from '../../interfaces/signup/SignupFormFields.ts';
import { useTranslation } from 'react-i18next';

interface AccessCredentialsProps {
  register: UseFormRegister<SignupFormFields>;
  errors: FieldErrors<SignupFormFields>;
  setError: UseFormSetError<SignupFormFields>;
  setValue: UseFormSetValue<SignupFormFields>;
  getValues: UseFormGetValues<SignupFormFields>;
  watch: UseFormWatch<SignupFormFields>;
}

export default function AccessCredentials({
  register,
  errors,
  getValues,
  watch,
}: AccessCredentialsProps) {
  const { t } = useTranslation('signup', {
    keyPrefix: 'fields.accessCredentials',
  });
  const { t: tErrors } = useTranslation('common', {
    keyPrefix: 'forms.validationErrors',
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const watchPassword = watch('password');
  const errorList = {
    maxLength: watchPassword && watchPassword.length <= 24,
    minLength: watchPassword && watchPassword.length >= 8,
    uppercase: /[A-Z]/.test(watchPassword),
    lowercase: /[a-z]/.test(watchPassword),
    number: /\d/.test(watchPassword),
    specialCharacter: /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(watchPassword),
  };

  return (
    <>
      <FormControl isRequired isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">{t('email.label')}</FormLabel>
        <InputGroup>
          <Input
            id="email"
            placeholder={t('email.placeholder')}
            {...register('email', {
              required: tErrors('required'),
              pattern: {
                value: /^\S+@{1}\S+[.]{1}\S+$/i,
                message: tErrors('invalid', { field: t('email.name') }),
              },
              maxLength: {
                value: 50,
                message: tErrors('maxLength', { limit: '50' }),
              },
            })}
          />
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.400" />
          </InputLeftElement>
        </InputGroup>

        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">{t('password.label')}</FormLabel>
        <InputGroup size="md">
          <Input
            id={'password'}
            pr="4.5rem"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('password.placeholder')}
            {...register('password', {
              required: tErrors('required'),
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,24}$/,
                message: tErrors('notMeetingRequirements'),
              },
            })}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword
                ? t('password.toggle.hide')
                : t('password.toggle.show')}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
        <UnorderedList>
          <ListItem
            className={
              errorList.minLength ? 'text-green-600' : 'text-slate-400'
            }
          >
            {t('password.requirements.minLength', { limit: 8 })}
          </ListItem>
          <ListItem
            className={errorList.uppercase ? 'text-green-600' : 'text-gray-400'}
          >
            {t('password.requirements.uppercase')}
          </ListItem>
          <ListItem
            className={errorList.lowercase ? 'text-green-600' : 'text-gray-400'}
          >
            {t('password.requirements.lowercase')}
          </ListItem>
          <ListItem
            className={errorList.number ? 'text-green-600' : 'text-gray-400'}
          >
            {t('password.requirements.number')}
          </ListItem>
          <ListItem
            className={
              errorList.specialCharacter ? 'text-green-600' : 'text-gray-400'
            }
          >
            {t('password.requirements.specialCharacter')}
          </ListItem>
          <ListItem
            className={errorList.maxLength ? 'text-green-600' : 'text-gray-400'}
          >
            {t('password.requirements.maxLength', { limit: 24 })}
          </ListItem>
        </UnorderedList>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="password">{t('confirmPassword.label')}</FormLabel>
        <InputGroup size="md">
          <Input
            id={'confirmPassword'}
            pr="4.5rem"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('confirmPassword.placeholder')}
            {...register('confirmPassword', {
              required: tErrors('required'),
              validate: (v) =>
                v === getValues('password') ||
                t('confirmPassword.requirements.match'),
            })}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword
                ? t('password.toggle.hide')
                : t('password.toggle.show')}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}

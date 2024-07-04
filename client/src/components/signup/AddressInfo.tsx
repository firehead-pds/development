import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
} from '@chakra-ui/react';
import { ChangeEventHandler, useEffect } from 'react';
import SignupFormFields from '../../interfaces/signup/SignupFormFields.ts';
import { useTranslation } from 'react-i18next';
import { useLazyViaCepQuery } from '../../features/signup/viaCepApiSlice.ts';

interface AddressInfoProps {
  register: UseFormRegister<SignupFormFields>;
  errors: FieldErrors<SignupFormFields>;
  setIsFetchingPostalCode: (value: boolean) => void;
  setError: UseFormSetError<SignupFormFields>;
  setValue: UseFormSetValue<SignupFormFields>;
  getValues: UseFormGetValues<SignupFormFields>;
  trigger: UseFormTrigger<SignupFormFields>;
  watch: UseFormWatch<SignupFormFields>;
  resetField: UseFormResetField<SignupFormFields>;
}

export default function AddressInfo({
  register,
  errors,
  setIsFetchingPostalCode,
  setValue,
  trigger,
  watch,
  resetField,
}: AddressInfoProps) {
  const { t } = useTranslation('signup', {
    keyPrefix: 'fields.addressInfo',
  });
  const { t: tErrors } = useTranslation('common', {
    keyPrefix: 'forms.validationErrors',
  });

  const watchCheckBox = watch('address.noAddressNumber');
  const [fetch, { data }] = useLazyViaCepQuery();

  useEffect(() => {
    setValue('address', {
      postalCode: data?.cep,
      addressLine: data?.logradouro,
      district: data?.bairro,
      city: data?.localidade,
      state: data?.uf,
    });
  }, [data, setValue]);

  const postalCodeChangeHandler: ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    try {
      setIsFetchingPostalCode(true);
      const currentPostalCode = e.target.value;

      if (currentPostalCode.length < 8 || currentPostalCode.length > 9) {
        setValue('address', {
          addressLine: '',
          district: '',
          city: '',
          state: '',
        });
        return;
      }
      if (!/^\d{5}-?\d{3}$/.test(currentPostalCode)) return;

      await fetch(currentPostalCode).unwrap();
    } finally {
      setIsFetchingPostalCode(false);
      await trigger('address.postalCode');
    }
  };

  return (
    <Grid>
      <FormControl isRequired isInvalid={!!errors.address?.postalCode}>
        <FormLabel htmlFor="cep">{t('postalCode.label')}</FormLabel>
        <Input
          id="cep"
          type="text"
          placeholder="00000-000"
          {...register('address.postalCode', {
            required: tErrors('required'),
            pattern: {
              value: /^\d{5}-?\d{3}$/,
              message: tErrors('invalid', { field: t('postalCode.name') }),
            },
          })}
          onChange={postalCodeChangeHandler}
          inputMode={'numeric'}
        />
        <FormErrorMessage>
          {errors.address?.postalCode && errors.address.postalCode.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="state">{t('state.label')}</FormLabel>
        <Input
          id="state"
          type="text"
          placeholder={t('state.placeholder')}
          {...register('address.state', {
            required: tErrors('required'),
          })}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="city">{t('city.label')}</FormLabel>
        <Input
          id="city"
          type="text"
          placeholder={t('city.placeholder')}
          {...register('address.city')}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="district">{t('district.label')}</FormLabel>
        <Input
          id="district"
          type="text"
          placeholder={t('district.placeholder')}
          {...register('address.district')}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="address">{t('addressLine.label')}</FormLabel>
        <Input
          id="address"
          type="text"
          placeholder={t('addressLine.placeholder')}
          {...register('address.addressLine')}
        />
      </FormControl>

      <FormControl
        isRequired={!watchCheckBox}
        isDisabled={watchCheckBox}
        isInvalid={!!errors.address?.addressNumber}
      >
        <FormLabel htmlFor="houseNumber">{t('addressNumber.label')}</FormLabel>

        <Input
          id="houseNumber"
          type="text"
          placeholder="Ex: 182"
          {...register('address.addressNumber', {
            required: {
              value: !watchCheckBox,
              message: tErrors('required'),
            },
            pattern: {
              value: /^[0-9]+$/,
              message: tErrors('onlyNumbers'),
            },
          })}
          inputMode={'numeric'}
        />

        <FormErrorMessage>
          {errors.address?.addressNumber &&
            errors.address.addressNumber.message}
        </FormErrorMessage>
      </FormControl>

      <Checkbox
        {...register('address.noAddressNumber', {
          onChange: () => {
            resetField('address.addressNumber');
          },
        })}
      >
        {t('noHouseNumber.label')}
      </Checkbox>

      <FormControl isInvalid={!!errors.address?.complement}>
        <FormLabel htmlFor="complement">{t('additionalInfo.label')}</FormLabel>
        <Input
          id="complement"
          type="text"
          placeholder={t('additionalInfo.placeholder')}
          {...register('address.complement', {
            maxLength: {
              value: 50,
              message: tErrors('maxLength', { limit: '50' }),
            },
          })}
        />
        <FormErrorMessage>
          {errors.address?.complement && errors.address.complement.message}
        </FormErrorMessage>
      </FormControl>
    </Grid>
  );
}

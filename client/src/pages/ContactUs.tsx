import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export interface ContactUsInputs {
  userEmail: string;
  title: string;
  message: string;
}

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactUsInputs>();

  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('contact-us');

  const toast = useToast();

  const { mutateAsync } = useMutation({
    mutationKey: ['contactData'],
    mutationFn: async (contactData: ContactUsInputs) => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API_URL!}/contact-us`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        },
      );

      if (!res.ok) {
        throw new Error(
          `Fetch request failed: ${res.status} ${res.statusText}`,
        );
      }

      return res.json();
    },
    onError: () => {
      toast({
        title: tCommon('toasts.serverError.title'),
        description: tCommon('toasts.serverError.description'),
        status: 'error',
      });
    },
    onSuccess: () => {
      reset();
      toast({
        title: t('toasts.sent.title'),
        description: t('toasts.sent.description'),
        status: 'success',
      });
    },
  });

  const onSubmit: SubmitHandler<ContactUsInputs> = async (data) => {
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
          onSubmit={handleSubmit(onSubmit)}
          className={'p-4 border rounded-lg mx-2 w-[600px]'}
          noValidate
        >
          <FormControl isRequired isInvalid={!!errors.userEmail}>
            <FormLabel htmlFor="userEmail">{t('fields.email.label')}</FormLabel>
            <Input
              id="userEmail"
              type="text"
              placeholder={t('fields.email.placeholder')}
              {...register('userEmail', {
                required: tCommon('forms.validationErrors.required'),
                pattern: {
                  value: /^\S+@\S+[.]\S+$/i,
                  message: tCommon('forms.validationErrors.invalid', {
                    field: t('fields.email.name'),
                  }),
                },
              })}
            />
            <FormErrorMessage>
              {errors.userEmail && errors.userEmail.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">{t('fields.title.label')}</FormLabel>
            <Input
              id="title"
              type="text"
              placeholder={t('fields.title.placeholder')}
              {...register('title', {
                required: tCommon('forms.validationErrors.required'),
                max: {
                  value: 50,
                  message: tCommon('forms.validationErrors.maxLength', {
                    limit: 50,
                  }),
                },
              })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.message}>
            <FormLabel htmlFor="message">{t('fields.message.label')}</FormLabel>
            <Textarea
              id="message"
              placeholder={t('fields.message.placeholder')}
              {...register('message', {
                required: tCommon('forms.validationErrors.required'),
                max: {
                  value: 200,
                  message: tCommon('forms.validationErrors.maxLength', {
                    limit: 200,
                  }),
                },
              })}
            />
            <FormErrorMessage>
              {errors.message && errors.message.message}
            </FormErrorMessage>
          </FormControl>

          <Button isLoading={isSubmitting} type="submit">
            {tCommon('forms.submit')}
          </Button>
        </form>
      </Flex>
    </>
  );
}

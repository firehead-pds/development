import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button
} from '@chakra-ui/react';

interface IFormInputs {
  Name: string
  Email: string
  CPF: string
};

export default function FormsCadastro() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => setTimeout(() => {alert(JSON.stringify(data, null, 2))}, 1000);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl isInvalid={errors.Name ? true : false}>
          <FormLabel htmlFor='Name'>Nome</FormLabel>
          <Input id='Name' type='text' placeholder='Digite seu Nome'
            {...register('Name', { pattern: { value: /^[A-Za-z ]*$/, message: "Um nome não contém números ou caracteres especiais." } })} />
          <FormErrorMessage>{errors.Name && errors.Name.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.Email ? true : false}>
          <FormLabel htmlFor="Email">Email</FormLabel>
          <Input id='Email' type='email' placeholder='Digite seu Email'
            {...register('Email', { pattern: { value: /^\S+@{1}\S+[.]{1}\S+$/i, message: "Tá Errado" } })} />
          <FormErrorMessage>{errors.Email && errors.Email.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.CPF ? true : false}>
          <FormLabel htmlFor="CPF">CPF</FormLabel>
          <Input id='CPF' type='text' placeholder='000.000.000-00'
            {...register('CPF', { pattern: { value: /^\d{3}[.]?\d{3}[.]?\d{3}[-]?\d{2}$/, message: "O formato utilizado está errado" } })} />
          <FormErrorMessage>{errors.CPF && errors.CPF.message}</FormErrorMessage>
        </FormControl>

        <Button type='submit'>Submit</Button>

      </form>
    </>
  );
};
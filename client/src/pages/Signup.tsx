import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";

interface IFormInputs {
  name: string;
  email: string;
  cpf: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
    setTimeout(() => {
      alert(JSON.stringify(data, null, 2));
    }, 1000);

  return (
    <>
      <Box
        maxW={"xl"}
        borderWidth={"1px"}
        borderRadius={"lg"}
        className={"m-10"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={"p-10"}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              {...register("name", {
                pattern: {
                  value: /^[A-Za-z ]*$/,
                  message:
                    "Nome não pode conter números ou caracteres especiais.",
                },
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              {...register("email", {
                pattern: {
                  value: /^\S+@{1}\S+[.]{1}\S+$/i,
                  message: "Tá Errado",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.cpf}>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              {...register("cpf", {
                pattern: {
                  value: /^\d{3}[.]?\d{3}[.]?\d{3}[-]?\d{2}$/,
                  message: "O formato utilizado está errado",
                },
              })}
            />
            <FormErrorMessage>
              {errors.cpf && errors.cpf.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  );
}

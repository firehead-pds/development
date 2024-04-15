import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Button,
  Box
} from "@chakra-ui/react";


interface IFormInputs {
  name: string;
  birthday: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  shoesSize: string;
  shirtSize: string;
  pantsSize: string;
};

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

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Box
        maxW={"xl"}
        borderWidth={"1px"}
        borderRadius={"lg"}
        className={"m-10"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={"p-10"}>

          {/*Name Input*/}
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Type your name..."
              {...register("name", {
                pattern: {
                  value: /^[A-Za-z ]*$/,
                  message: "The name don't have numbers or special characters!",
                },
                maxLength: {
                  value: 70,
                  message: "The name need at most 70 characters!"
                }
              })}
            />

            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          {/*Birthday Input*/}
          <FormControl isInvalid={!!errors.birthday}>
            <FormLabel htmlFor="birthday">Your Birthday</FormLabel>
            <Input
              id="birthday"
              type="date"
              {...register("birthday")}
            />

            <FormErrorMessage>
              {/*errors.birthday && errors.birthday.message*/}
            </FormErrorMessage>
          </FormControl>

          {/*Email Input*/}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <Input
                id="email"
                type="email"
                placeholder="Type your email..."
                {...register("email", {
                  pattern: {
                    value: /^\S+@{1}\S+[.]{1}\S+$/i,
                    message: "The email pattern is invalid!"
                  },
                  maxLength: {
                    value: 70,
                    message: "The email need at most 70 characters!"
                  }
                })}
              />
              <InputRightElement pointerEvents='none'>
                <EmailIcon color='gray.400' />
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/*Password Input*/}
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Type your password..."
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "The password need at least 8 characters!"
                  },
                  maxLength: {
                    value: 24,
                    message: "The password need at most 24 characters!"
                  }
                })}
              />
              <InputRightElement>
                <Button onClick={handleShowPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/*CPF Input*/}
          <FormControl isInvalid={!!errors.cpf}>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              {...register("cpf", {
                pattern: {
                  value: /^\d{3}[.]?\d{3}[.]?\d{3}[-]?\d{2}$/,
                  message: "The pattern is invalid!"
                }
              })}
            />

            <FormErrorMessage>
              {errors.cpf && errors.cpf.message}
            </FormErrorMessage>
          </FormControl>

          {/*Phone Input*/}
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <PhoneIcon color='gray.400' />
              </InputLeftElement>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                {...register("phone", {
                  pattern: {
                    value: /^[(]?\d{2}[)]?[ ]?\d{5}[-]?\d{4}$/,
                    message: "The pattern is invalid!"
                  }
                })}
              />
            </InputGroup>

            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>

          {/*Shirt Size Select*/}
          <FormControl isInvalid={!!errors.shirtSize}>
            <FormLabel htmlFor="shirtSize">Shirt Size</FormLabel>
            <Select id="shirtSize" {...register("shirtSize")} >
              <option value='PP'>PP</option>
              <option value='P'>P</option>
              <option value='M' selected={true}>M</option>
              <option value='G'>G</option>
              <option value='GG'>GG</option>
            </Select>
          </FormControl>

          {/*Pants Size Select*/}
          <FormControl isInvalid={!!errors.pantsSize}>
            <FormLabel htmlFor="pantsSize">Vou ver ainda</FormLabel>

            <FormErrorMessage>
              {/*errors.pantsSize && errors.pantsSize.messages*/}
            </FormErrorMessage>
          </FormControl>

          {/*Shoes Size Select*/}
          <FormControl isInvalid={!!errors.shoesSize}>
            <FormLabel htmlFor="shoesSize">Vou ver ainda</FormLabel>

            <FormErrorMessage>
              {/*errors.shoesSize && errors.shoesSize.messages*/}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  );
};
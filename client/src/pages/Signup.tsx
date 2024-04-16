import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

interface IFormInputs {
  name: string;
  birthday: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  shoeSize: string;
  shirtSize: string;
  pantsSize: string;
  postalCode: string;
  state: string;
  city: string;
  district: string;
  address: string;
}

const pantsSizes = [34, 36, 38, 40, 42, 44, 46, 48, 50];

/*
const CreateTodo = () => {
  const mutation = useMutation(formData => {
    return fetch('/api', formData)
  })
  const onSubmit = event => {
    event.preventDefault()
    mutation.mutate(new FormData(event.target))
  }

  return <form onSubmit={onSubmit}>...</form>
}
*/

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<IFormInputs> = async (formData) => {
    const finalFormData: IFormInputs = Object.assign(formData,
      { "state": data.uf }, { "city": data.localidade },
      { "district": data.bairro }, { "address": data.logradouro });
    setTimeout(() => {
      alert(JSON.stringify(finalFormData, null, 2));
    }, 1000);
  }


  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);


  const [postalCode, setPostalCode] = useState("");
  const { data, refetch } = useQuery({
    queryKey: ['cepData'],
    queryFn: () => {
      return fetch("https://viacep.com.br/ws/" + postalCode + "/json").then((res) => {
        return res.json()
      }
      )
    },
    enabled: false
  });

  const postalCodeBlurHandler: React.FocusEventHandler<
    HTMLInputElement
  > = async (e) => {
    setPostalCode(e.target.value);
    if (postalCode.length !== 8) return;
    await refetch();
    console.log(data);
  };

  return (
    <>
      <Box
        maxW={"xl"}
        borderWidth={"1px"}
        borderRadius={"lg"}
        m={"5rem auto 5rem auto"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={"p-10"}>
          {/*Name Input*/}
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
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
                  message: "The name need at most 70 characters!",
                },
              })}
            />

            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          {/*Birthday Input*/}
          <FormControl isRequired isInvalid={!!errors.birthday}>
            <FormLabel htmlFor="birthday">Your Birthday</FormLabel>
            <Input id="birthday" type="date" {...register("birthday")} />

            <FormErrorMessage>
              {/*errors.birthday && errors.birthday.message*/}
            </FormErrorMessage>
          </FormControl>

          {/*Email Input*/}
          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <Input
                id="email"
                type="email"
                placeholder="Type your email..."
                {...register("email", {
                  pattern: {
                    value: /^\S+@{1}\S+[.]{1}\S+$/i,
                    message: "The email pattern is invalid!",
                  },
                  maxLength: {
                    value: 70,
                    message: "The email need at most 70 characters!",
                  },
                })}
              />
              <InputRightElement pointerEvents="none">
                <EmailIcon color="gray.400" />
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/*Password Input*/}
          <FormControl isRequired isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Type your password..."
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "The password need at least 8 characters!",
                  },
                  maxLength: {
                    value: 24,
                    message: "The password need at most 24 characters!",
                  },
                })}
              />
              <InputRightElement>
                <Button onClick={handleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/*CPF Input*/}
          <FormControl isRequired isInvalid={!!errors.cpf}>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              {...register("cpf", {
                pattern: {
                  value: /^\d{3}[.]?\d{3}[.]?\d{3}[-]?\d{2}$/,
                  message: "The pattern is invalid!",
                },
              })}
            />

            <FormErrorMessage>
              {errors.cpf && errors.cpf.message}
            </FormErrorMessage>
          </FormControl>

          {/*Phone Input*/}
          <FormControl isRequired isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.400" />
              </InputLeftElement>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                {...register("phone", {
                  pattern: {
                    value: /^[(]?\d{2}[)]?[ ]?\d{5}[-]?\d{4}$/,
                    message: "The pattern is invalid!",
                  },
                })}
              />
            </InputGroup>

            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)">
            {/*Shirt Size Select*/}
            <FormControl isRequired isInvalid={!!errors.shirtSize}>
              <FormLabel htmlFor="shirtSize">Shirt Size: </FormLabel>{" "}
              {/*Não sei como colocar esses texto em inglês*/}
              <Select id="shirtSize" {...register("shirtSize")}>
                <option key={"Shirt_PP"} value="PP">
                  PP
                </option>
                <option key={"Shirt_P"} value="P">
                  P
                </option>
                <option key={"Shirt_M"} value="M">
                  M
                </option>
                <option key={"Shirt_G"} value="G">
                  G
                </option>
                <option key={"Shirt_GG"} value="GG">
                  GG
                </option>
                <option key={"Shirt_GGX"} value="GGX">
                  GGX
                </option>
                <option key={"Shirt_GGXE"} value="GGXE">
                  GGXE
                </option>
              </Select>
            </FormControl>

            {/*Pants Size Select*/}
            <FormControl isRequired isInvalid={!!errors.pantsSize}>
              <FormLabel htmlFor="pantsSize">Pants Size: </FormLabel>
              <Select id="pantsSize" {...register("pantsSize")}>
                {pantsSizes.map((size) => (
                  <option key={"Pants_" + size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/*Shoe Size Select*/}
            <FormControl isRequired isInvalid={!!errors.shoeSize}>
              <FormLabel htmlFor="shoeSize">Shoe Size: </FormLabel>
              <NumberInput
                defaultValue={36}
                clampValueOnBlur={true}
                {...(register("shoeSize"),
                {
                  min: 30,
                  max: 48,
                })}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Grid>

          <Grid>
            <FormControl isRequired isInvalid={!!errors.postalCode}>
              <FormLabel htmlFor="postalCode">Postal Code:</FormLabel>
              <Input
                id="postalCode"
                type="text"
                placeholder="00000000"
                {...register("postalCode", {
                  pattern: {
                    value: /^\d{8}$/,
                    message: "The pattern is invalid!",
                  },
                  onBlur: postalCodeBlurHandler,
                })}
              />
              <FormErrorMessage>
                {errors.postalCode && errors.postalCode.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="state">State:</FormLabel>
              <Input
                disabled
                value={data !== undefined ? data.uf : ""}
                variant="filled"
                id="state"
                type="text"
                placeholder="SP"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="city">City:</FormLabel>
              <Input
                disabled
                value={data !== undefined ? data.localidade : ""}
                variant="filled"
                id="city"
                type="text"
                placeholder="São Paulo"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="district">District:</FormLabel>
              <Input
                disabled
                value={data !== undefined ? data.bairro : ""}
                variant="filled"
                id="district"
                type="text"
                placeholder="Canindé"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="address">Address:</FormLabel>
              <Input
                disabled
                value={data !== undefined ? data.logradouro : ""}
                variant="filled"
                id="address"
                type="text"
                placeholder="Rua Pedro Vicente"
              />
            </FormControl>
          </Grid>

          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  );
}
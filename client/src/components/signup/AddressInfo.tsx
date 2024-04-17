import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IFormInputs } from "../../pages/Signup.tsx";
import { useQuery } from "@tanstack/react-query";

interface AddressInfoProps {
  register: UseFormRegister<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
}

interface Address {
  postalCode?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
}

interface ViacepApiResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export default function AddressInfo({ register, errors }: AddressInfoProps) {
  const addressInitialState: Address = {
    postalCode: "",
    address: "",
    district: "",
    city: "",
    state: "",
  };

  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState(addressInitialState);

  const { refetch } = useQuery({
    queryKey: ["postalCode"],
    queryFn: async () => {
      const req = await fetch(
        "https://viacep.com.br/ws/" + postalCode + "/json",
      );

      if (!req.ok) {
        throw new Error(
          `Fetch request failed: ${req.status} ${req.statusText}`,
        );
      }

      const res = (await req.json()) as ViacepApiResponse;

      setAddress({
        postalCode: res.cep,
        address: res.logradouro,
        district: res.bairro,
        city: res.localidade,
        state: res.uf,
      });

      return res;
    },
    enabled: false,
  });

  const postalCodeBlurHandler: React.FocusEventHandler<
    HTMLInputElement
  > = async (e) => {
    if (errors.postalCode) return;

    const postalCode = e.target.value;
    console.log(postalCode);
    setPostalCode(postalCode);
    await refetch();
  };

  return (
    <Grid>
      <FormControl isRequired isInvalid={!!errors.postalCode}>
        <FormLabel htmlFor="cep">CEP:</FormLabel>
        <Input
          id="cep"
          type="text"
          placeholder="00000-000"
          {...register("postalCode", {
            pattern: {
              value: /^\d{5}[-]?\d{3}$/,
              message: "CEP Inválido",
            },
            onBlur: postalCodeBlurHandler,
          })}
        />
        <FormErrorMessage>
          {errors.postalCode && errors.postalCode.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="state">Estado:</FormLabel>
        <Input id="state" type="text" placeholder="SP" value={address.state} />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="city">Cidade:</FormLabel>
        <Input
          id="city"
          type="text"
          placeholder="São Paulo"
          value={address.city}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="district">Bairro:</FormLabel>
        <Input
          id="district"
          type="text"
          placeholder="Canindé"
          value={address.district}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="address">Logradouro:</FormLabel>
        <Input
          id="address"
          type="text"
          placeholder="Rua Pedro Vicente"
          value={address.address}
        />
      </FormControl>
    </Grid>
  );
}

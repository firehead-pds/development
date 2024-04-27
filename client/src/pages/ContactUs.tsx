import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

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

  const toast = useToast();

  const { mutateAsync } = useMutation({
    mutationKey: ["contactData"],
    mutationFn: async (contactData: ContactUsInputs) => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API_URL!}/contact-us`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
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
        title: "Error",
        description: "Could not connect to the server.",
        status: "error",
      });
    },
    onSuccess: () => {
      reset();
      toast({
        title: "Done",
        description: "Message sent successfully.",
        status: "success",
      });
    },
  });

  const onSubmit: SubmitHandler<ContactUsInputs> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        className={"w-screen my-6"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"p-4 border rounded-lg mx-2 w-[600px]"}
          noValidate
        >
          <FormControl isRequired isInvalid={!!errors.userEmail}>
            <FormLabel htmlFor="userEmail">Your Email:</FormLabel>
            <Input
              id="userEmail"
              type="text"
              placeholder="useremail21@example.com"
              {...register("userEmail", {
                required: "This field is required",
                pattern: {
                  value: /^\S+@{1}\S+[.]{1}\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            <FormErrorMessage>
              {errors.userEmail && errors.userEmail.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Title:</FormLabel>
            <Input
              id="title"
              type="text"
              placeholder="I can't enter in my profile"
              {...register("title", {
                required: "This field is required",
              })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.message}>
            <FormLabel htmlFor="message">Message:</FormLabel>
            <Textarea
              id="message"
              placeholder="Type here your message..."
              {...register("message", {
                required: "This field is required",
              })}
            />
            <FormErrorMessage>
              {errors.message && errors.message.message}
            </FormErrorMessage>
          </FormControl>

          <Button isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Flex>
    </>
  );
}

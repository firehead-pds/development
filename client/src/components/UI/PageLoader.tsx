import { Center, Spinner } from "@chakra-ui/react";

export default function PageLoader() {
  return (
    <Center className={"h-screen"}>
      <Spinner size={"xl"} />
    </Center>
  );
}

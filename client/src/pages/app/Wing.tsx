import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGenerateInviteMutation } from '../../features/wing/wingApiSlice.ts';
import { useParams } from 'react-router-dom';

interface GenerateInviteFormFields {
  wingId: number;
}

export default function Wing() {
  const { handleSubmit } = useForm<GenerateInviteFormFields>();
  const [invite, { isLoading }] = useGenerateInviteMutation();

  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();

  const onSubmit: SubmitHandler<GenerateInviteFormFields> = async () => {
    try {
      if (id === undefined) {
        console.log('UndefineD');
        return;
      }
      const wingId: GenerateInviteFormFields = { wingId: +id };
      const res = await invite(wingId).unwrap();
      const inviteCode = res.token;

      const currentUrl = window.location.origin;

      const inviteLink = `${currentUrl}/app/join-wing/${inviteCode}`;

      setValue(inviteLink);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        className={'w-screen my-6'}
      >
        <form
          id={'generateInvite'}
          onSubmit={handleSubmit(onSubmit)}
          className={'p-4 border rounded-lg mx-2 w-[500px]'}
          noValidate
        >
          <Button
            type={'submit'}
            isLoading={isLoading}
            form={'generateInvite'}
            onClick={isLoading ? () => {} : onOpen}
          >
            Generate Invite
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Invite Code Link</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input value={value} readOnly mr={2} mb={5} />
                <Button onClick={onCopy} mb={2}>
                  {hasCopied ? 'Copied!' : 'Copy Link'}
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </form>
      </Flex>
    </>
  );
}

import { SubmitHandler, useForm } from 'react-hook-form';
import { useGenerateInviteMutation } from '../../../../features/wing/wingApiSlice.ts';
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
import { useParams } from 'react-router-dom';
import { RWebShare } from 'react-web-share';
import { useTranslation } from 'react-i18next';

interface GenerateInviteFormFields {
  wingId: number;
}

export default function GenerateInviteCode() {
  const { t: tFriends } = useTranslation('friends', {
    keyPrefix: 'invite',
  });
  const { handleSubmit } = useForm<GenerateInviteFormFields>();
  const [invite, { isLoading }] = useGenerateInviteMutation();

  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wingId } = useParams();

  const onSubmit: SubmitHandler<GenerateInviteFormFields> = async () => {
    try {
      if (!wingId) {
        console.error('Could not get id for the current accessed wing');
        return;
      }
      const payload = { wingId: +wingId };

      const res = await invite(payload).unwrap();
      const inviteCode = res.token;

      const currentUrl = window.location.origin;

      const inviteLink = `${currentUrl}/app/join-wing/${inviteCode}`;
      setValue(inviteLink);

      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{tFriends('modal-label')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Input value={value} readOnly mr={2} mb={5} />
              <Button onClick={onCopy} mb={2}>
                {hasCopied ? tFriends('copied') : tFriends('copy')}
              </Button>
            </Flex>
            <RWebShare
              data={{
                url: value,
              }}
            >
              <Button>{tFriends('share')}</Button>
            </RWebShare>
          </ModalBody>
        </ModalContent>
      </Modal>

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
          <Button type={'submit'} isLoading={isLoading} form={'generateInvite'}>
            {tFriends('create')}
          </Button>
        </form>
      </Flex>
    </>
  );
}

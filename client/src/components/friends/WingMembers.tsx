import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  ListItem,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Roles } from '../../features/auth/authSlice.ts';
import { FriendProps } from '../../pages/app/friends/Friends.tsx';

export default function WingMembers({
  users,
  isLoading,
  friendFunction,
  colorScheme,
  buttonText,
}: FriendProps) {
  const { t: tCommon } = useTranslation('common', {
    keyPrefix: 'roles',
  });
  let color = 'gray';
  switch (users.role) {
    case Roles.WingChief:
      color = 'red';
      break;
    case Roles.Harmony:
      color = 'blue';
      break;
    case Roles.Component:
      color = 'green';
      break;
  }
  return (
    <>
      <ListItem mb={5}>
        <Card>
          <Flex p={3} alignItems={'center'}>
            <Avatar ml={3} mr={5} size={'lg'} name={`${users.name}`} />
            <Flex flexDir={'column'} display={'block'}>
              <Box>
                <Text mb={1} fontSize={'xl'}>
                  {users.name}
                </Text>
                <Tag size={'md'} colorScheme={color}>
                  {tCommon(users.role)}
                </Tag>
              </Box>
              <Button
                mt={2}
                colorScheme={colorScheme}
                onClick={() => friendFunction(users.id)}
                isLoading={isLoading === users.id}
              >
                {buttonText}
              </Button>
            </Flex>
          </Flex>
        </Card>
      </ListItem>
    </>
  );
}

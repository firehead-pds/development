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
import { CommonFriendProps } from '../../pages/app/friends/Friends.tsx';
import { Roles } from '../../features/auth/authSlice.ts';

interface OldFriendProps extends CommonFriendProps {
  deleteFriend: (id: number) => void;
}

export default function OldFriend({
  friend,
  isLoading,
  deleteFriend,
}: OldFriendProps) {
  const { t: tCommon } = useTranslation('common', {
    keyPrefix: 'roles',
  });
  const { t: tFriends } = useTranslation('friends', {
    keyPrefix: 'friend.status',
  });
  let color = 'gray';
  switch (friend.role) {
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
            <Avatar ml={3} mr={5} size={'lg'} name={`${friend.name}`} />
            <Flex flexDir={'column'} display={'block'}>
              <Box>
                <Text mb={1} fontSize={'xl'}>
                  {friend.name}
                </Text>
                <Tag size={'md'} colorScheme={color}>
                  {tCommon(friend.role)}
                </Tag>
              </Box>
              <Button
                mt={2}
                colorScheme={'red'}
                onClick={() => deleteFriend(friend.id)}
                isLoading={isLoading === friend.id}
              >
                {tFriends('delete')}
              </Button>
            </Flex>
          </Flex>
        </Card>
      </ListItem>
    </>
  );
}

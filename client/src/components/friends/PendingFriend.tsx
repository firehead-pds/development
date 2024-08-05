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
import { CommonFriendProps } from '../../pages/app/friends/Friends.tsx';

interface PendingFriendProps extends CommonFriendProps {
  acceptFriend: (id: number) => void;
}

export default function PendingFriend({
  friend,
  count,
  acceptFriend,
}: PendingFriendProps) {
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
      <ListItem key={count} mb={5}>
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
                colorScheme={'teal'}
                onClick={() => acceptFriend(friend.id)}
              >
                {tFriends('accept')}
              </Button>
            </Flex>
          </Flex>
        </Card>
      </ListItem>
    </>
  );
}

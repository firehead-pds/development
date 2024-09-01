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
import { RoleColors } from '../../types/user/Roles.ts';
import { GetUsersResponse } from '../../features/wing/wingApiSlice.ts';

export interface WingMembersListProps {
  user: GetUsersResponse;
  isLoading: number | null;
  friendFunction?: (id: number) => void;
  colorScheme: string;
  buttonText: string;
}

export default function WingMembersList({
  user,
  isLoading,
  friendFunction,
  colorScheme,
  buttonText,
}: WingMembersListProps) {
  const { t: tCommon } = useTranslation('common', {
    keyPrefix: 'roles',
  });

  return (
    <>
      <ListItem mb={5}>
        <Card>
          <Flex p={3} alignItems={'center'}>
            <Avatar ml={3} mr={5} size={'lg'} name={`${user.name}`} />
            <Flex flexDir={'column'} display={'block'}>
              <Box>
                <Text mb={1} fontSize={'xl'}>
                  {user.name}
                </Text>
                <Tag size={'md'} colorScheme={RoleColors[user.role]}>
                  {tCommon(user.role)}
                </Tag>
              </Box>
              <Button
                mt={2}
                colorScheme={colorScheme}
                onClick={friendFunction && (() => friendFunction(user.id))}
                isLoading={isLoading === user.id}
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

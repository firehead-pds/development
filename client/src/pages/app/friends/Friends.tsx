import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
} from '@chakra-ui/react';
import {
  GetUsersReturn,
  Status,
  useAcceptFriendRequestMutation,
  useCreateFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useGetUsersQuery,
} from '../../../features/wing/wingApiSlice.ts';
import { useParams } from 'react-router-dom';
import WingMembers from '../../../components/friends/WingMembers.tsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export interface FriendProps {
  users: GetUsersReturn;
  isLoading: number | null;
  friendFunction: (id: number) => void;
  colorScheme: string;
  buttonText: string;
}

export default function Friendship() {
  const { t: tFriends } = useTranslation('friends', {
    keyPrefix: 'friends.status',
  });
  const { t: tStatus } = useTranslation('friends', {
    keyPrefix: 'friends.status',
  });

  const { wingId } = useParams();
  const [friendRequest] = useCreateFriendRequestMutation();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const [deleteRequest] = useDeleteFriendRequestMutation();
  const { data: wingMemberData, refetch } = useGetUsersQuery(Number(wingId));

  const [isLoading, setIsLoading] = useState<number | null>(null);

  const existingFriends: GetUsersReturn[] = [];
  const pendingFriendRequests: GetUsersReturn[] = [];
  const eligibleFriendRequests: GetUsersReturn[] = [];
  const wingMembers: GetUsersReturn[] = [];

  const addFriend = async (id: number) => {
    try {
      setIsLoading(id);
      await friendRequest({ receiverId: id }).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const acceptFriendRequest = async (id: number) => {
    try {
      setIsLoading(id);
      await acceptRequest({ requestId: id }).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  const deleteFriend = async (id: number) => {
    try {
      setIsLoading(id);
      await deleteRequest({ friendId: id }).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  wingMemberData?.forEach((friend) => {
    if (!friend.status) {
      wingMembers.push(friend);
    }
    if (friend.status === Status.PENDING) {
      if (friend.sentByCurrentUser) {
        pendingFriendRequests.push(friend);
      } else {
        eligibleFriendRequests.push(friend);
      }
    }
    if (friend.status === Status.ACCEPTED) {
      existingFriends.push(friend);
    }
  });

  return (
    <>
      <Flex
        flexDir={'column'}
        align={'center'}
        justify={'center'}
        w={'full'}
        my={6}
      >
        <Tabs isFitted isLazy>
          <TabList minWidth={'xl'} mb="1em">
            <Tab>{tFriends('add')}</Tab>
            <Tab>{tFriends('pending')}</Tab>
            <Tab>{tFriends('friends')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UnorderedList styleType={''}>
                {wingMembers.map((users, i) => {
                  return (
                    <WingMembers
                      key={i}
                      users={users}
                      isLoading={isLoading}
                      friendFunction={addFriend}
                      colorScheme={'blue'}
                      buttonText={tStatus('sendRequest')}
                    />
                  );
                })}
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <UnorderedList styleType={''}>
                {eligibleFriendRequests.map((users, i) => {
                  return (
                    <WingMembers
                      key={i}
                      users={users}
                      isLoading={isLoading}
                      friendFunction={acceptFriendRequest}
                      colorScheme={'teal'}
                      buttonText={tStatus('accept')}
                    />
                  );
                })}
                {pendingFriendRequests.map((users, i) => {
                  return (
                    <WingMembers
                      key={i}
                      users={users}
                      isLoading={isLoading}
                      friendFunction={function (id) {
                        return id;
                      }}
                      colorScheme={'orange'}
                      buttonText={tStatus('pending')}
                    />
                  );
                })}
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <UnorderedList styleType={''}>
                {existingFriends.map((users, i) => {
                  return (
                    <WingMembers
                      key={i}
                      users={users}
                      isLoading={isLoading}
                      friendFunction={deleteFriend}
                      colorScheme={'red'}
                      buttonText={tStatus('delete')}
                    />
                  );
                })}
              </UnorderedList>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}

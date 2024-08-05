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
  useGetUsersQuery,
} from '../../../features/wing/wingApiSlice.ts';
import { useParams } from 'react-router-dom';
import NewFriend from '../../../components/friends/NewFriend.tsx';
import OldFriend from '../../../components/friends/OldFriend.tsx';
import PendingFriend from '../../../components/friends/PendingFriend.tsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export interface CommonFriendProps {
  friend: GetUsersReturn;
  isLoading: number;
}

export default function Friendship() {
  const { t: tFriends } = useTranslation('friends', {
    keyPrefix: 'friend.labels',
  });
  const { wingId } = useParams();
  const [friendRequest] = useCreateFriendRequestMutation();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const { data: wingMemberData, refetch } = useGetUsersQuery(Number(wingId));
  const [isLoading, setIsLoading] = useState(0);

  const oldFriends: GetUsersReturn[] = [];
  const pendingFriends: GetUsersReturn[] = [];
  const newFriends: GetUsersReturn[] = [];

  const addFriend = async (id: number) => {
    try {
      setIsLoading(id);
      await friendRequest({ receiverId: id }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriend = async (id: number) => {
    try {
      setIsLoading(id);
      await acceptRequest({ requestId: id }).unwrap();
      refetch();
      setIsLoading(0);
    } catch (error) {
      console.log(error);
    }
  };


  wingMemberData?.forEach((friend) => {
    if (
      (friend.sentByCurrentUser && friend.status === Status.PENDING) ||
      !friend.status
    ) {
      newFriends.push(friend);
    }
    if (!friend.sentByCurrentUser && friend.status === Status.PENDING) {
      pendingFriends.push(friend);
    }
    if (friend.status === Status.ACCEPTED) {
      oldFriends.push(friend);
    }
  });

  return (
    <>
      <Flex
        flexDir={'column'}
        align={'center'}
        justify={'center'}
        className={'w-screen my-6'}
      >
        <Tabs isFitted isLazy>
          <TabList mb="1em">
            <Tab>{tFriends('add')}</Tab>
            <Tab>{tFriends('pending')}</Tab>
            <Tab>{tFriends('yourFriends')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UnorderedList styleType={''}>
                {newFriends.map((friend, i) => {
                  return (
                    <NewFriend
                      key={i}
                      friend={friend}
                      isLoading={isLoading}
                      addFriend={addFriend}
                    />
                  );
                })}
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <UnorderedList styleType={''}>
                {pendingFriends.map((friend, i) => {
                  return (
                    <PendingFriend
                      key={i}
                      friend={friend}
                      isLoading={isLoading}
                      acceptFriend={acceptFriend}
                    />
                  );
                })}
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <UnorderedList styleType={''}>
                {oldFriends.map((friend, i) => {
                  return (
                    <OldFriend
                      key={i}
                      friend={friend}
                      isLoading={isLoading}
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

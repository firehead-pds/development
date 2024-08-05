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

export interface CommonFriendProps {
  friend: GetUsersReturn;
  count: number;
}

export default function Friendship() {
  const { t: tFriends } = useTranslation('friends', {
    keyPrefix: 'friend.labels',
  });
  const { wingId } = useParams();
  const [friendRequest] = useCreateFriendRequestMutation();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const { data: wingMemberData, refetch } = useGetUsersQuery(Number(wingId));
  const oldFriends: GetUsersReturn[] = [],
    pendingFriends: GetUsersReturn[] = [],
    newFriends: GetUsersReturn[] = [];

  const addFriend = async (id: number) => {
    try {
      await friendRequest({ receiverId: id }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriend = async (id: number) => {
    try {
      await acceptRequest({ requestId: id }).unwrap();
      refetch();
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
      console.log(friend);
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
                      friend={friend}
                      count={i}
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
                      friend={friend}
                      count={i}
                      acceptFriend={acceptFriend}
                    />
                  );
                })}
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <UnorderedList styleType={''}>
                {oldFriends.map((friend, i) => {
                  return <OldFriend friend={friend} count={i} />;
                })}
              </UnorderedList>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}

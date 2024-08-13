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
  GetUsersResponse,
  Status,
  useAcceptFriendRequestMutation,
  useCreateFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useGetUsersQuery,
} from '../../../features/wing/wingApiSlice.ts';
import { useParams } from 'react-router-dom';
import WingMembersList from '../../../components/members/WingMembersList.tsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Members() {
  const { t } = useTranslation('members');

  const { wingId } = useParams();
  const [friendRequest] = useCreateFriendRequestMutation();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const [deleteRequest] = useDeleteFriendRequestMutation();
  const { data: wingMemberData, refetch } = useGetUsersQuery(+wingId);

  const [isLoading, setIsLoading] = useState<number | null>(null);

  const existingFriends: GetUsersResponse[] = [];
  const pendingFriendRequests: GetUsersResponse[] = [];
  const eligibleFriendRequests: GetUsersResponse[] = [];
  const wingMembers: GetUsersResponse[] = [];

  const addFriend = async (id: number) => {
    try {
      setIsLoading(id);
      await friendRequest({ receiverId: id }).unwrap();
      await refetch().unwrap();
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
      await refetch().unwrap();
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
      await refetch().unwrap();
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
        className={'w-screen my-6'}
      >
        <Tabs isFitted isLazy>
          <TabList mb="1em">
            <Tab>{t('labels.add')}</Tab>
            <Tab>{t('labels.pending')}</Tab>
            <Tab>{t('labels.friends')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UnorderedList styleType={''}>
                {wingMembers.map((users, i) => {
                  return (
                    <WingMembersList
                      key={i}
                      user={users}
                      isLoading={isLoading}
                      friendFunction={addFriend}
                      colorScheme={'blue'}
                      buttonText={t('status.sendRequest')}
                    />
                  );
                })}
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <UnorderedList styleType={''}>
                {eligibleFriendRequests.map((users, i) => {
                  return (
                    <WingMembersList
                      key={i}
                      user={users}
                      isLoading={isLoading}
                      friendFunction={acceptFriendRequest}
                      colorScheme={'teal'}
                      buttonText={t('status.accept')}
                    />
                  );
                })}
                {pendingFriendRequests.map((users, i) => {
                  return (
                    <WingMembersList
                      key={i}
                      user={users}
                      isLoading={isLoading}
                      colorScheme={'orange'}
                      buttonText={t('status.pending')}
                    />
                  );
                })}
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <UnorderedList styleType={''}>
                {existingFriends.map((users, i) => {
                  return (
                    <WingMembersList
                      key={i}
                      user={users}
                      isLoading={isLoading}
                      friendFunction={deleteFriend}
                      colorScheme={'red'}
                      buttonText={t('status.delete')}
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

import {
  AbsoluteCenter,
  Avatar,
  Card,
  Flex,
  Grid,
  GridItem,
  ListItem,
  Tag,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useGetUsersQuery } from '../../../features/wing/wingApiSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';

export default function Friendship() {
  const { wingId } = useParams();
  const navigate = useNavigate();

  if (!wingId) {
    console.error('Could not load wing id.');
    navigate('/app/dashboard');
    return;
  }
  const { data } = useGetUsersQuery({ wingId: +wingId });
  console.log(data);
  return (
    <>
      <Flex
        flexDir={'column'}
        align={'center'}
        justify={'center'}
        className={'w-screen my-6'}
      >
        <UnorderedList styleType={''}>
          {data?.map((friend) => (
            <>
              <ListItem>
                <Card>
                  <Grid
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(4, 1fr)"
                    h={'150px'}
                    w={'500px'}
                  >
                    <GridItem rowSpan={2} colSpan={1}>
                      <Avatar size={'lg'} name={`${friend.name}`} />
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={3}>
                      <Text fontSize={'xl'}>{friend.name}</Text>
                      <Tag size={'xl'}>{friend.role}</Tag>
                    </GridItem>
                  </Grid>
                </Card>
              </ListItem>
            </>
          ))}

          <ListItem>
            <Card>
              <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                h={'200px'}
                w={'550px'}
              >
                <GridItem rowSpan={2} colSpan={1} position={'relative'}>
                  <AbsoluteCenter>
                    <Avatar size={'lg'} name={`Igor`} />
                  </AbsoluteCenter>
                </GridItem>
                <GridItem rowSpan={2} colSpan={3} pt={5}>
                  <Text fontSize={'xl'}>Igor Aguiar</Text>
                </GridItem>
              </Grid>
            </Card>
          </ListItem>
        </UnorderedList>
      </Flex>
    </>
  );
}

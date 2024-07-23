import {
  AbsoluteCenter,
  Avatar,
  Card,
  Flex,
  Grid,
  GridItem,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

export default function Friendship() {
  return (
    <>
      <Flex
        flexDir={'column'}
        align={'center'}
        justify={'center'}
        className={'w-screen my-6'}
      >
        <UnorderedList styleType={''}>
          {/*{data?.map((friend) => (
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
                    </GridItem>
                  </Grid>
                </Card>
              </ListItem>
            </>
          ))}*/}

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

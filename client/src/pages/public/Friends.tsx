import {
  Avatar,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function Friendship() {
  const { t } = useTranslation('friends', {
    keyPrefix: 'labels',
  });

  return (
    <>
      <Flex
        flexDir={'column'}
        align={'center'}
        justify={'center'}
        className={'w-screen my-6'}
      >
        <Heading display={'block'} mb={20}>
          {t('pageTitle')}
        </Heading>
        <UnorderedList styleType={''}>
          <ListItem>
            <Card>
              <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                h={'150px'}
                w={'500px'}
              >
                <GridItem rowSpan={2} colSpan={1}>
                  <Avatar size={'lg'} name={'Igor Aguiar'} />
                </GridItem>
                <GridItem colSpan={3} pt={5} justifySelf={'stretch'}>
                  <Text fontSize={'xl'}>Igor Aguiar</Text>
                </GridItem>
                <GridItem colSpan={3}>
                  <Text>Some text here like: lorem ipsum</Text>
                </GridItem>
              </Grid>
            </Card>
          </ListItem>
        </UnorderedList>
      </Flex>
    </>
  );
}

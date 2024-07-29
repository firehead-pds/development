import {
  Avatar, Box,
  Card,
  Flex,
  ListItem,
  Tag,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useGetUsersQuery } from '../../../features/wing/wingApiSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import {Roles} from "../../../features/auth/authSlice.ts";

export default function Friendship() {
  const { wingId } = useParams();
  const navigate = useNavigate();

  if (!wingId) {
    console.error('Could not load wing id.');
    navigate('/app/dashboard');
    return;
  }
  const { data } = useGetUsersQuery(+wingId);

  return (
    <>
      <Flex
        flexDir={'column'}
        align={'center'}
        justify={'center'}
        className={'w-screen my-6'}
      >
        <UnorderedList styleType={''}>
          {data?.map((friend, i) => {
            let color = "gray";

            switch(friend.role){
              case Roles.WingChief: color = "red"; break;
              case Roles.Harmony: color = "blue"; break;
              case Roles.Component: color = "green"; break;
            }

            return (
                <ListItem key={i} mb={5}>
                  <Card>
                    <Flex p={3}>
                        <Avatar mr={5} size={"lg"} name={`${friend.name}`}/>
                      <Box>
                        <Text mb={1} fontSize={"xl"}>{friend.name}</Text>
                        <Tag size={"md"} colorScheme={color}
                        >{friend.role}</Tag>
                      </Box>
                      <Text>{friend.status}</Text>
                    </Flex>
                  </Card>
                </ListItem>
            );
          })}
        </UnorderedList>
      </Flex>
    </>
  );
}

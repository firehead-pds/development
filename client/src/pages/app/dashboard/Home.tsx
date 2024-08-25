import { Box, useColorModeValue } from '@chakra-ui/react';
import Dashboard from './component/Dashboard.tsx';
import UserHeader from '../../../components/UserUI/UserHeader.tsx';
import { useAppSelector } from '../../../app/hook.ts';
import { selectCurrentUser } from '../../../features/auth/authSlice.ts';

export default function Home() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <UserHeader
        onOpen={null}
        name={user ? user.firstName + ' ' + user.lastName : null}
      />
      <Box p="4">
        <Dashboard user={user} />
      </Box>
    </Box>
  );
}

import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hook.ts';
import {
  selectCurrentUser,
  selectUserIsPartOfWing,
} from '../features/auth/authSlice.ts';
import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import SidebarContent from '../components/UserUI/SidebarContent.tsx';
import UserHeader from '../components/UserUI/UserHeader.tsx';

export default function MembershipProtectedRoute() {
  const user = useAppSelector(selectCurrentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wingId } = useParams();

  if (wingId && user) {
    const wing = useAppSelector((state) =>
      selectUserIsPartOfWing(state, +wingId),
    );

    return wing ? (
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
        >
          <DrawerContent>
            <SidebarContent wingId={Number(wingId)} onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <UserHeader
          onOpen={onOpen}
          name={user.firstName + ' ' + user.lastName}
        />
        <Flex justifyContent={'center'} alignItems={'center'} p="4">
          <Outlet />
        </Flex>
      </Box>
    ) : (
      <Navigate to={'/app/dashboard'} />
    );
  }
}

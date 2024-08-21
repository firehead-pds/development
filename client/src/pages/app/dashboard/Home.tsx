import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import SidebarContent from '../../../components/dashboard/SidebarContent.tsx';
import MobileNav from '../../../components/dashboard/MobileNav.tsx';
import Dashboard from '../../../components/dashboard/Dashboard.tsx';
import { useAppSelector } from '../../../app/hook.ts';
import { selectCurrentUser } from '../../../features/auth/authSlice.ts';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAppSelector(selectCurrentUser);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Dashboard user={user} />
      </Box>
    </Box>
  );
}

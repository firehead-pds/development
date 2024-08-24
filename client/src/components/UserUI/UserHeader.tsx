import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';
import { logOut } from '../../features/auth/authSlice.ts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook.ts';

interface MobileProps extends FlexProps {
  name: string | null;
  onOpen: (() => void) | null;
}

export default function UserHeader({ onOpen, name, ...rest }: MobileProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <Flex
      px={8}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={
        onOpen
          ? { base: 'space-between', md: 'space-between' }
          : 'space-between'
      }
      {...rest}
    >
      {onOpen ? (
        <>
          <IconButton
            display={'flex'}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />
        </>
      ) : null}

      <Text
        display={onOpen ? { base: 'flex', md: 'none' } : 'flex'}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'md'} name={`${name}`} />
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={onLogOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}

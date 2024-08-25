import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiHome, FiStar } from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import NavItem from './NavItem.tsx';

interface LinkItemProps {
  name: string;
  icon: IconType;
  endpoint: string;
}

interface SidebarProps extends BoxProps {
  wingId: number;
  onClose: () => void;
}

export default function SidebarContent({
  wingId,
  onClose,
  ...rest
}: SidebarProps) {
  const LinkItems: LinkItemProps[] = [
    { name: 'Home', icon: FiHome, endpoint: `/app/wing/${wingId}` },
    {
      name: 'Participantes da Ala',
      icon: FaUserFriends,
      endpoint: `/app/wing/${wingId}/friends`,
    },
    { name: 'TO-DO', icon: FiStar, endpoint: `/app/wing/${wingId}` },
  ];

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 'xs' }}
      pos={'fixed'}
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={'flex'} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link
          _hover={{ textDecoration: 'none' }}
          as={ReactRouterLink}
          to={link.endpoint}
        >
          <NavItem key={link.name} icon={link.icon} onClick={onClose}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
}

import { forwardRef, HTMLAttributes } from 'react';
import { Box, Text } from '@chakra-ui/react';

type Props = {
  wingMemberName: string;
  isDragging?: boolean;
  isOpacityEnabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Item = forwardRef<HTMLDivElement, Props>(
  ({ wingMemberName, isOpacityEnabled, isDragging, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        backgroundColor={'white'}
        borderWidth="1px"
        borderRadius="10px"
        boxShadow={
          isDragging
            ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
            : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px'
        }
        cursor={isDragging ? 'grabbing' : 'grab'}
        minHeight={'75px'}
        minWidth={'150px'}
        lineHeight={'0.5'}
        opacity={isOpacityEnabled ? '0.5' : '1'}
        p={4}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        transform={isDragging ? 'scale(1.05)' : 'scale(1)'}
        {...props}
      >
        <Text maxWidth={'100%'} objectFit={'cover'}>
          {wingMemberName}
        </Text>
      </Box>
    );
  },
);

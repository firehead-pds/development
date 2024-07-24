import { useParams } from 'react-router-dom';
import {
  GridCell,
  useGetWingGridQuery,
} from '../../../features/wing/wingGridApiSlice.ts';
import { Box, Center, Grid } from '@chakra-ui/react';

export default function WingGrid() {
  const { gridId } = useParams();
  const { data, isLoading } = useGetWingGridQuery({ id: +gridId! });

  if (data) {
    console.log(data);
    const orderedGrid: GridCell[][] = Array.from({ length: data.rows }, () =>
      Array.from({ length: data.cols }, () => null),
    ) as any;

    data.gridCells.forEach((cell) => {
      orderedGrid[cell.row - 1][cell.col - 1] = cell;
    });

    return (
      <Box
        minHeight={'100vh'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Center>
          <Grid templateColumns={`repeat(${data.cols}, 1fr)`} gap={4}>
            {orderedGrid.map((row, rowIndex) =>
              row.map((cell, columnIndex) => (
                <Box
                  key={columnIndex}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  textAlign="center"
                  bgColor={cell.user ? 'gray.100' : 'white'}
                >
                  {cell.user ? cell.user.firstName : 'Vazio'}
                </Box>
              )),
            )}
          </Grid>
        </Center>
      </Box>
    );
  }
}

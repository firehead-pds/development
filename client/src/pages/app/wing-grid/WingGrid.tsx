import { useParams } from 'react-router-dom';
import {
  GridCell,
  useGetWingGridQuery,
} from '../../../features/wing/wingGridApiSlice.ts';
import { useEffect, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { Box, Center, Grid } from '@chakra-ui/react';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import SortableItem from '../../../components/dnd-kit/SortableItem.tsx';
import { Item } from '../../../components/dnd-kit/Item.tsx';

export default function WingGrid() {
  const { gridId } = useParams();
  const { data } = useGetWingGridQuery({ id: +gridId! });
  const [items, setItems] = useState<GridCell[]>([]);
  const [activeItem, setActiveItem] = useState<GridCell>();

  useEffect(() => {
    if (data) {
      const orderedGrid: GridCell[] = Array.from(
        { length: data.rows * data.cols },
        () => null,
      ) as any;

      data.gridCells.forEach((cell, i) => {
        orderedGrid[i] = cell;
      });

      setItems(orderedGrid);
    }
  }, [data]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(items.find((item) => item.id === active.id));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const droppedItem = items.find((item) => item.id === active.id);
    const underItem = items.find((item) => item.id === over.id);

    if (!droppedItem || !underItem) {
      return;
    }

    const droppedIndex = items.findIndex((item) => item.id === active.id);
    const underIndex = items.findIndex((item) => item.id === over.id);

    if (droppedIndex !== underIndex) {
      setItems((prev) => arrayMove<GridCell>(prev, droppedIndex, underIndex));
    }
    setActiveItem(undefined);
  }

  return (
    <Box
      minHeight={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Center>
        <Grid templateColumns={`repeat(${data?.cols}, 1fr)`} gap={4}>
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragCancel={() => setActiveItem(undefined)}
            onDragEnd={handleDragEnd}
          >
            {items && (
              <SortableContext
                items={items.map((i) => i.id)}
                strategy={rectSortingStrategy}
              >
                {items.map((cell) => (
                  <SortableItem
                    key={cell.id}
                    idNumber={cell.id}
                    wingMemberName={cell.user ? cell.user.firstName : 'Vazio'}
                  />
                ))}
              </SortableContext>
            )}
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
              {activeItem ? (
                <Item
                  wingMemberName={
                    activeItem.user ? activeItem.user.firstName : 'Vazio'
                  }
                  isDragging
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </Grid>
      </Center>
    </Box>
  );
}

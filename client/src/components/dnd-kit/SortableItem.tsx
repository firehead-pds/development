import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HTMLAttributes } from 'react';
import { Item } from './Item.tsx';

type SortableProps = {
  wingMemberName: string;
  idNumber: number;
} & HTMLAttributes<HTMLDivElement>;

export default function SortableItem({
  idNumber,
  wingMemberName,
  ...props
}: SortableProps) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: idNumber,
  });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      ref={setNodeRef}
      wingMemberName={wingMemberName}
      isOpacityEnabled={isDragging}
      style={styles}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
}

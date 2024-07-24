import { useNavigate, useParams } from 'react-router-dom';
import { useCreateWingGridMutation } from '../../../features/wing/wingGridApiSlice.ts';
import { Button } from '@chakra-ui/react';

export default function CreateWingGrid() {
  const { wingId } = useParams();
  const navigate = useNavigate();

  const [createWing, { isLoading }] = useCreateWingGridMutation();

  const onClick = async () => {
    if (wingId) {
      const res = (await createWing({ id: +wingId }).unwrap()) as any;
      console.log(res);
      navigate(`/app/wing/${wingId}/grids/${res.id}`);
    }
  };

  return (
    <>
      <Button onClick={onClick} isLoading={isLoading}>
        Create Grid
      </Button>
    </>
  );
}

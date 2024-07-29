import { useAppSelector } from '../../../app/hook.ts';
import {
  setWings,
  selectCurrentUser,
  logOut,
} from '../../../features/auth/authSlice.ts';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hook.ts';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import {
  useCreateWingMutation,
  useLazyGetWingsQuery,
} from '../../../features/wing/wingApiSlice.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
interface CreateWingFormFields {
  wingName: string;
}

export default function Dashboard() {
  const { t: tRoles } = useTranslation('common', {
    keyPrefix: 'roles',
  });
  const { t: tSimpleText } = useTranslation('common', {
    keyPrefix: 'simpleText',
  });
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [createWing, { isLoading }] = useCreateWingMutation();
  const [getWings] = useLazyGetWingsQuery();

  const { register, handleSubmit } = useForm<CreateWingFormFields>();

  const onSubmit: SubmitHandler<CreateWingFormFields> = async (formData) => {
    try {
      await createWing(formData).unwrap();
      const allWings = await getWings().unwrap();
      dispatch(setWings(allWings));
    } catch (error) {
      console.log(error);
    }
  };
  const onLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <>
      <Button type={'button'} onClick={onLogOut}>
        {tSimpleText('logout')}
      </Button>
      <form
        id={'createWingForm'}
        onSubmit={handleSubmit(onSubmit)}
        className={'p-4 border rounded-lg mx-2 w-[500px]'}
        noValidate
      >
        <FormControl isRequired>
          <FormLabel htmlFor="wingName">
            {tSimpleText('createWing.label')}
          </FormLabel>
          <Input id="wingName" type="text" {...register('wingName')}></Input>
        </FormControl>
        <Button isLoading={isLoading} type={'submit'} form={'createWingForm'}>
          {tSimpleText('createWing.button')}
        </Button>
      </form>
      <br />
      {user?.wingMemberships?.map((wingMembership, i) => {
        return (
          <Box key={i} className={'p-4 border rounded-lg mx-2 w-[500px]'}>
            <Link
              as={ReactRouterLink}
              to={`/app/wing/${wingMembership.wing.id}`}
            >
              {wingMembership.wing.name + ' - ' + wingMembership.wing.id}
            </Link>
            <br />
            <Text>
              {tRoles('show')} {tRoles(wingMembership.role)}
            </Text>
          </Box>
        );
      })}
    </>
  );
}

import { Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function WelcomePage() {
  const { t: tSimpleText } = useTranslation('common', {
    keyPrefix: 'simpleText',
  });
  return (
    <>
      <>
        <Link as={ReactRouterLink} to={'/signup'}>
          {tSimpleText('signup')}
        </Link>
        <br />
        <Link as={ReactRouterLink} to={'/contact-us'}>
          {tSimpleText('contact-us')}
        </Link>
        <br />
        <Link as={ReactRouterLink} to={'/login'}>
          {tSimpleText('login')}
        </Link>
      </>
    </>
  );
}

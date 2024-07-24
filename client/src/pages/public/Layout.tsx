import Header from '../../components/UI/Header.tsx';
import Footer from '../../components/UI/Footer.tsx';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

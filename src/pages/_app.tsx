import '../styles/globals.css';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { GoogleFonts } from 'next-google-fonts';
import { DefaultSeo } from 'next-seo';
import { ToastProvider } from 'react-toast-notifications';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ToastProvider>
        <DefaultSeo
          titleTemplate={
            router.route === '/' ? 'Dr. Consulta' : '%s | Dr. Consulta'
          }
        />
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" />
        <Component {...pageProps} />
      </ToastProvider>
    </>
  );
}
export default MyApp;

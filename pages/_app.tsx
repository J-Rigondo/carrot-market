import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Script from 'next/script';

const fetcher = async (uri: string) => {
  const response = await fetch(uri);
  const json = await response.json();

  return json;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          window.fbAsyncInit = function () {
            FB.init({
              appId: 'your-app-id',
              autoLogAppEvents: true,
              xfbml: true,
              version: 'v14.0',
            });
          };
        }}
      />
    </SWRConfig>
  );
}

export default MyApp;

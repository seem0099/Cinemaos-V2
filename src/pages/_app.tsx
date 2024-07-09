// _app.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Head from "next/head";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import Layout from "@/components/Layout";
import "../styles/globals.scss"; // Ensure your global styles are imported

import type { AppProps } from "next/app";
import type { NextRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/snapping.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.start();
    };

    const handleRouteChangeComplete = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  const GTag: any = process.env.NEXT_PUBLIC_GT_MEASUREMENT_ID;

  return (
    <>
      <Head>
        <title>Rive</title>
        {/* Add your meta tags, links, and other head elements */}
      </Head>
      <Layout>
        <Toaster
          toastOptions={{
            className: "sooner-toast-desktop",
          }}
          position="bottom-right"
        />
        <Toaster
          toastOptions={{
            className: "sooner-toast-mobile",
          }}
          position="top-center"
        />
        <Component {...pageProps} />
      </Layout>
      <GoogleAnalytics gaId={GTag} />
    </>
  );
}

export default MyApp;

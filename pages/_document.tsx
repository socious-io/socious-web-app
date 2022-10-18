import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html>
        <Head>
          {/* PWA */}
          <meta name="description" content="Socious" />
          <meta name="application-name" content="Socious" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Socious" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          <link rel="manifest" href="/manifest.json" />
          {/* ICONS */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://socious.io/favicons/apple-touch-icon.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://socious.io/favicons/favicon.ico"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://socious.io/favicons/favicon-16x16.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://socious.io/favicons/favicon-32x32.png"
          ></link>
          <link
            rel="mask-icon"
            href="https://socious.io/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          ></link>
          <link
            rel="manifest"
            href="https://socious.io/favicons/site.webmanifest"
          ></link>

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@600&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css"
          />
          <script
            src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"
            async
          ></script>
        </Head>
        <body className="font-inter">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

import type { Metadata } from "next";
import "./globals.css";

const metadata: Metadata = {
  title: "Aniday",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
export { metadata };

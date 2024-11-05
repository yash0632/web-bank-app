import type { Metadata } from "next";

import "./globals.css";
import { Provider } from "./providers";
import { AppbarClient } from "../components/AppbarClient";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`antialiased overflow-y-hidden h-screen w-screen overflow-x-hidden`}
      >
        <Provider>
          <AppbarClient></AppbarClient>
          {children}
        </Provider>
      </body>
      
    </html>
  );
}

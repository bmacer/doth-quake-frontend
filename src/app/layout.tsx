import type { Metadata } from "next";
import { Provider } from "@/components/provider";

export const metadata: Metadata = {
  title: "Doth Quake - Evrloot",
  description: "Doth Quake - Evrloot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export const metadata = {
    title: "E-com",
    description: "created by the vartecc dev team"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body >
          {children}
        </body>
      </html>
  );
}
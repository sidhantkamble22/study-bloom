import "./globals.css";

export const metadata = {
  title: "StudyBloom",
  description: "Focus and grow your plant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
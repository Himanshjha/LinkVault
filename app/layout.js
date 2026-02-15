import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "LinkVault",
  description: "Smart Bookmark Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#070B14] text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

import ErrorBoundary from "@/components/error-boundary";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import type React from "react"; // Added import for React
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Expense Manager",
  description: "Manage your expenses and income",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>{children}</ErrorBoundary>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


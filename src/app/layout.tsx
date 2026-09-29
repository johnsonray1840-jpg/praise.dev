import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export const metadata: Metadata = {
  title: "Praise Godswill | Software Engineer & Systems Architect",
  description: "Production-grade interactive portfolio of Praise Godswill featuring real-time telemetry, 3D systems, interactive terminal, and AI assistant.",
  keywords: ["Software Engineer", "Full Stack Developer", "Next.js", "React", "TypeScript", "Three.js", "Node.js", "Praise Godswill"],
  authors: [{ name: "Praise Godswill" }],
  openGraph: {
    title: "Praise Godswill | Software Engineer & Systems Architect",
    description: "Interactive portfolio featuring real-time telemetry, 3D systems, interactive terminal, and AI assistant.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased selection:bg-[#2563EB] selection:text-white overflow-x-hidden min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

import "../admin-login-styles.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Login | De'Hydra",
  description: "Admin login page",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

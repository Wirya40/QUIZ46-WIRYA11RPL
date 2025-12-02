import "./globals.css";
import { AppProvider } from "./context/AppContext";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata = {
  title: "Employees App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}

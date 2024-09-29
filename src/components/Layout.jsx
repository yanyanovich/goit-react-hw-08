import { Suspense } from "react";
import AppBar from "../components/AppBar/AppBar";

export const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
};

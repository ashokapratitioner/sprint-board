import { ReactNode, Suspense } from "react";

const SuspenseComponent = ({
    children,
  }: Record<string, ReactNode>) => (
    <Suspense fallback="Loading...">{children}</Suspense>
  );


  export default SuspenseComponent;
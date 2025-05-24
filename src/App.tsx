import { lazy, Suspense } from "react";

const AppLayout = lazy(() => import("./components/layout/AppLayout"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppLayout />
    </Suspense>
  );
}

export default App;

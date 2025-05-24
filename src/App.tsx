import { lazy, Suspense } from "react";
import { Loader } from "./components/template/Loader";

const AppLayout = lazy(() => import("./components/layout/AppLayout"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AppLayout />
    </Suspense>
  );
}

export default App;

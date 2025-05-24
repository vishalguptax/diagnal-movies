import { MoviesList } from "../shared/MoviesList";
import { Navbar } from "../template/Navbar";

const AppLayout = () => {
  return (
    <div className="flex flex-col flex-auto min-h-screen min-w-0 relative items-center w-full">
      <Navbar />
      <main className="relative h-full flex flex-auto flex-col p-2 sm:px-6 md:px-8 sm:py-6 container">
        <MoviesList />
      </main>
    </div>
  );
};

export default AppLayout;

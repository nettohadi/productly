import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-[100vh] bg-slate-400 flex justify-center items-center background-root">
      <div className="flex flex-col justify-center items-center gap-3 p-2 w-full max-w-[700px] h-[400px] border-xl bg-white rounded-md">
        <h1 className="w-full text-center text-lg font-bold">
          Links to go to each tests
        </h1>
        <div className="flex flex-col gap-2">
          <Link
            to="first-test"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-3 hover:bg-blue-700 transition-colors"
          >
            First Test
          </Link>
          <Link
            to="second-test"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-3 hover:bg-blue-700 transition-colors"
          >
            Second Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

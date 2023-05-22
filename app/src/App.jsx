import { Suspense, useContext } from "react";
import { useRoutes, useNavigate } from "react-router-dom";

import { CountContext } from "./context/CountProvider";

import { APP_ROUTES } from "./routes/Routes";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

function App() {
  return (
    <>
      <Suspense
        fallback={
          <MainLayout>
            <Loading />
          </MainLayout>
        }
      >
        <MainLayout>
          {/* <DefaultPage /> */}
          <MainRouter routes={APP_ROUTES} />
        </MainLayout>
      </Suspense>
    </>
  );
}

export default App;

const Loading = () => <div>loading...</div>;

const MainLayout = ({ children }) => {
  const { count, setCount } = useContext(CountContext);
  const navigate = useNavigate();
  return (
    <div className="w-full text-gray-400b flex2 flex-col2 h-full">
      {/* <Header /> */}
      <div onClick={() => navigate("/")}>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React!!!</h1>
      {children}
      {/* <Footer /> */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

const MainRouter = ({ routes }) => {
  const element = useRoutes(routes);
  return element;
};

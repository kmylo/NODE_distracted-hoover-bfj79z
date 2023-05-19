import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

const EP_URL = "https://localhost:3001/api/notes";
// const EP_URL = "/api/notes";
// const EP_URL = "https://i5msdw-3001.csb.app/api/notes";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(EP_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((e) => console.log({ e }));
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React!!!</h1>
      <ListItems {...{ items: data }} />
      {/* <pre>
        DATA:
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre> */}
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
    </>
  );
}

export default App;

const ListItems = ({ items }) => {
  if (!items) return null;
  return (
    <div className="item-list">
      {items.map((item, idx) => {
        return (
          <div className="item-container" key={item.id}>
            <div className="content">
              {idx}: {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

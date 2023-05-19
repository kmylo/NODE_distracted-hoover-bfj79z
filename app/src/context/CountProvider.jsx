import React from "react";

function preserveRef(key, v) {
  if (import.meta.env.PROD) return v;

  const old = import.meta.hot.data[key];
  const now = old || v;

  import.meta.hot.on("vite:beforeUpdate", () => {
    import.meta.hot.data[key] = now;
  });

  return now;
}
export const CountContext = preserveRef("c", React.createContext());

export const CountProvider = ({ children }) => {
  const [count, setCount] = React.useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
};

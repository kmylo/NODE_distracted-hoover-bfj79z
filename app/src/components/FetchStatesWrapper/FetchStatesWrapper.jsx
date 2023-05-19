import ErrorStackParser from "error-stack-parser";

export const JSONComp = ({ data, space = 2 } = {}) => {
  if (!data) return <div className="text-left"> RESULTS: null</div>;
  return (
    <pre className="text-left">
      RESULTS:
      <code>{JSON.stringify(data, null, space)}</code>
    </pre>
  );
};

const ErrorMsg = ({ error }) => {
  const formErr = ErrorStackParser.parse(error);
  console.error(
    { error, ERROR: formErr },
    JSON.parse('{"result":true, "count":42}')
  );
  return <JSONComp data={formErr} />;
  // return <div>{error}</div>;
};

export const LoadingMsg = (props) => (
  <div className="loading msg-box" {...props}>
    !!LOADING....
  </div>
);

const FetchStatesWrapper = ({
  children,
  error,
  isLoaded,
  items,
  debug = false,
}) => {
  if (error) return <ErrorMsg {...{ error }} />;
  if (isLoaded) return <LoadingMsg />;

  return (
    <>
      {debug && <JSONComp data={{ error, isLoaded }} />}
      {items && children}
    </>
  );
};

export default FetchStatesWrapper;

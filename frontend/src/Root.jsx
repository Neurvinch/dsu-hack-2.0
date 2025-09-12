import { useEffect, useState } from "react";
import App from "./App";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

function Root() {
  const [ready, setReady] = useState(false);
  const [useTestAadhaar, setUseTestAadhaar] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <AnonAadhaarProvider
          _useTestAadhaar={useTestAadhaar}
          _appName="Anon Aadhaar"
        >
          <App
            setUseTestAadhaar={setUseTestAadhaar}
            useTestAadhaar={useTestAadhaar}
          />
        </AnonAadhaarProvider>
      ) : null}
    </>
  );
}

export default Root;

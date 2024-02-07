import getErrorMessage from "./get-error-message";

import type { FallbackProps } from "react-error-boundary";

export default function Fallback({ error }: FallbackProps) {
  return (
    <div className="container">
      <h1>Something went wrong</h1>
      <p>{getErrorMessage(error)}</p>
    </div>
  );
}

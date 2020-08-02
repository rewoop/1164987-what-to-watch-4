import * as React from "react";
import {css} from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  display: block;
  margin: auto;
`;

const Loading = () => {
  return (
    <div className="sweet-loading"
    style={{height: `100vh`, backgroundColor: `#150202`}}>
      <PacmanLoader
        css={override}
        size={100}
        color={`#eee5b5`}
        loading={true}
      />
    </div>
  );
};

export default Loading;

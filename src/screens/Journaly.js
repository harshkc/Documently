import React from "react";
import Notes from "../components/journal/Notes";

const Journal = ({user}) => {
  return (
    <div
      style={{
        maxWidth: "70vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Notes />
    </div>
  );
};

export default Journal;

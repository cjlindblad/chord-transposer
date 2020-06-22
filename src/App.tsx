import React from "react";
import { Scale, Note, NoteName } from "./lib/src/api";

const scale = Scale.from(Note.from(NoteName.C));

function App() {
  return (
    <div>
      <header>
        <p>C major scale - {scale.toString()}</p>
      </header>
    </div>
  );
}

export default App;

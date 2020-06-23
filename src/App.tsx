import React from 'react';
import { Scale, Note, NoteName } from './lib/api';

const scale = Scale.from(Note.from(NoteName.C));

function App() {
  return (
    <div>
      <header className="text-red-700 text-center">
        <p>C major scale - {scale.toString()}</p>
      </header>
    </div>
  );
}

export default App;

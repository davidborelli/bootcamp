import React, { useState } from 'react';

function App() {
  const [techs, setTech] = useState(['React Native', 'ReactJS', 'Node.js']);
  const [newTech, setNewTech] = useState('');

  const handleAdd = () => {
    setTech([...techs, newTech]);
    setNewTech('');
  };

  return (
    <>
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTech}
        onChange={event => setNewTech(event.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Inserir
      </button>
    </>
  );
}

export default App;

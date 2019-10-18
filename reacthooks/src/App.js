import React, { useState, useEffect } from 'react';

function App() {
  const [techs, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  const handleAdd = () => {
    setTech([...techs, newTech]);
    setNewTech('');
  };

  // simulando didMount | Caracteristica é que não gerencia ninguém, ou seja executa somente quando montar
  useEffect(() => {
    const storageTech = localStorage.getItem('techs');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }

    // willUnmount, vai ser executada sempre que o componente deixar de existir
    // Pode ser retornado para cada um dos useEffect()
    return () => {};
  }, []);

  /* Recebe uma função que vai ser executada, segundo parametro é quando vai ser
   executada(arr de variaveis que vai ficar ouvindo)
   Simulando didUpdate
   */
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

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

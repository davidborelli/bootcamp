import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [techs, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  /* Cada vez que uma variável gerenciada é alterada o JavaScript remonta tudo, inclusive as funções
    isso pode afetar o desempenho do JS em caso de funções mais complexas, para resolver esse problema
    veio o useCallback, que só vai remontar a função novamente quando as variáveis indicadas a ele mudar.
  */
  const handleAdd = useCallback(() => {
    setTech([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

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

  /* Memo é utilizando para sempre que precisar calcular alguma coisa dentro do HTML, caso
    não utilize o mesmo, sempre que uma variável que estiver sendo gerenciada mudar, o HTML
    vai atulizar tudo, isso não é bom, o useMemo() resolve esse problema indicando para ele
    o que fazer e quando qual variável for diferente do estado anterior
  */
  const techSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong> <br />
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

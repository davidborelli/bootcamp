# Utilizando React Hooks

## Hooks Utilizados:
1. Hook useState();
2. Hook useEffect();
3. Hook useMemo();
4. Hook useCallback()

# Descrevendo a funcionalidade de cada Hook

### ***useState()*** :
Utilizado para criar vaiáveis de state. Nele é possível indicar qual quais variáveis serão "ouvidas".

***Exemplo de implementação:***
```
const [nomeState, nomeFnSetaState] = useState(vlrQueSeraIniciado);
```
---
### ***useEffect()*** :
Utilizado para substituir os métodos de montagem, desmontagem e update do componente **(componentDidMount()/componentWillUnmount()/componentDidUpdate())**

***Exemplo de implementação:***

**Este exemplo substitui componentDidUpdate() => A caracteristica é que no segundo parâmetro é indicado as variáveis que o mesmo irá gerenciar alterações.**
```
useEffect(() => {
  lógica da função que será executada
}, [variaveisGerenciadas])
```

**Este exemplo substitui componentDidMount() => A caracteristica é que no segundo parâmetro é passado um array vazio, indicando que o mesmo só sera executado quando montar o componente.**

***OBS: Muito importante ele sempre vir primeiro que o exemplo que substitui o componentDidUpdate()***
```
useEffect(() => {
  lógica da função que será executada
}, [])
```
---
### ***useMemo()*** :
Sempre que um state que é ouvido é alterado, o React recarrega por completo o corpo HTML, então para resolver esse problema o useMemo() é utilizando, indicando que só sera recarregado quando o valor que ele gerencia for alterado, por exemplo...
```
const techsSize = useMemo(() => tamanhoDeUmArray, [quemEhArray])

// Ex.
const techsSize = useMemo(() => techs.length, [techs])
```

E no corpo HTML techSize deverá ser utilizado.

---
### ***useCallback()*** :
Muito parecido com o useMemo(), sempre que um state gerenciado é alterado, o JavaScript remonta tudo, inclusive as funções, isso pode afetar o desempenho do JS em caso de funções mais complexas. Para resolver esse problema é utilizado o useCallback, que só vai remontar a função novamente quando as variáveis indicadas a ele mudar.
```
const nomeDaFuncao = useCallback(() => {
  ...lógica da função
}, [array com as dependências utilizadas na fn])

// Ex.
const handleAdd = useCallback(() => {
  setTech([...techs, newTech]);
  setNewTech('');
}, [newTech, techs]);
```

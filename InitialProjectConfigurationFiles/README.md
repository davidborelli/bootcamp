#Configurando projeto par ter uma StyleGuide para código

###Configurando o .editorconfig
  Para executar essa configuração precisa ter a extensão do **_editorconfig_** instalada no VSCODE.
  Com a exigência acima atendida, para gera o arquivo de configuração basta clicar em um lugar “em branco”,
  no painel lateral com o botão direito do mouse, e selecionar a opção **“Generate .editorconfig"**

**Gerado o arquivo abrir o mesmo e em:**
```
trim_trailing_whitespace = false => true
Insert_final_newline = false => true
```

***Adicionar a seguinte linha:***
```
end_of_line = lf    // Para forçar que os finais das linhas sejam no padrão Unix.
```


###Configurando o ESLint
Adicionar o ESLint como dependência de desenvolvimento:
```yarn add eslint -D```

Para incur a configuração através de um ja existente (Airbnb)
```yarn eslint —-init```

#####Selecione as seguintes opções:
1. To check syntax, find problems, and enforce code style;
2. JavaScript modules (import/export);
3. React;
4. Browser;
5. Use a popular style guide;
6. Airbnb;
7. JavaScript.

Feito esse procedimento é gerado um arquivo package-lock.json, pode deletar o mesmo e rodar o comando:
yarn
Na raiz do projeto para atualizar as dependências


###Configurando o Prettier
Executar o comando:
```yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D```

Abrir o arquivo .eslintrc.js e fazer as seguintes configs:
1. Em extends adicionar ‘prettier’, ‘prettier/react';
2. Antes da propriedade parserOptions, adicionar propriedade parser: ‘babel-eslint’;
3. Em plugins adicionar ‘prettier’;
4. Em rules adicionar as regras:

```                  
{
  "prettier/prettier": "error",
  "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
  "import/prefer-default-export": "off"
}
```

 
Na raiz do projeto criar um arquivo **.prettierrc** e adicionar o seguinte conteúdo:

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```












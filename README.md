# Test project using Next.js and Strapi

> **ATENÇÃO**: não é obrigatório fazer o projecto todo. Faça até onde conseguir e, se possível, documente as suas dificuldades. O mais importante é entregar.

## Overview ℹ️
Vamos criar uma aplicação de uma escola.

- A escola tem n cursos.
- Cada curso tem n níveis.
- Cada nível tem 4 disciplinas.
- O utilizador pode se registar em mais de um curso, mas nunca mais de uma vez no mesmo.
- Ao seleccionar um nível, o utilizador deverá escolher duas das quatro disciplinas disponíveis.

## Casos de uso 💼

### Caso de uso 1:
Maria está na homepage, mas não fez login. Nenhum conteúdo aparecerá para ela. Apenas um campo para fazer login ou se registar.

### Caso de uso 2:
Maria fez login e está na homepage, mas não é estudante de nenhuma escola. Em "Meus cursos", aparece uma mensagem: "Ainda não é estudante de nenhum curso.". No topo direito da página, há um botão: "Registar-se em um curso". Maria clica e é direccionada para uma página com cards de cada um dos cursos disponíveis. Maria deseja ser estudante do curso Astrologia. Ela selecciona o curso e é direccionada para a página do curso. Lá encontra, além do nome do curso, a descrição do curso e os níveis. Ela selecciona o nível Avançado e, então, é exibida uma lista com as disciplinas disponíveis. Ela deve escolher apenas 2 das 4 disciplinas. Ao concluir, ela é encaminhada para a homepage e agora já não há a mensagem "Ainda não é estudante de nenhum curso.". No lugar dessa mensagem, existe um card com as informações do curso em que ela se registou. Para se desregistar do curso, basta que Maria clique em um botão existente no Card com o texto "Remover curso".

### Caso de uso 3:
Maria fez login e já é estudante do curso de astrologia. Deseja se registar em um novo curso. Ela faz o mesmo fluxo acima. Desta vez, o curso de Astrologia não será exibido para ela, na listagem de cursos disponíveis. Ao concluir o processo, dois cards devem existir na homepage em "Meus cursos".

## Páginas e requisitos 📑

### Homepage (logged out):
- Formulário para fazer login com e-mail e password
- Formulário para se registar com e-mail, nome e password

### Homepage (logged in):
- Deve conter um botão para registar-se em um novo curso
- Deve conter uma secção com as informações do utilizador. O utilizador não poderá editar as informações. As informações são: nome, e-mail e data de registo.
- Deve conter uma secção chamada "Meus cursos" que exibirá os cursos registados em uma grid com cards (por exemplo, 3 cards por linha em desktop, 1 card por linha em mobile)
- Cada card de curso registado deve conter: nome do curso, nível, disciplinas seleccionadas e data de registo do estudante no curso
- No footer de cada card, deve haver um botão para "Remover curso". Ao clicar no botão, ele deve desaparecer da lista de "Meus cursos".

### Cursos disponíveis:
- Deve conter uma grid de cards, reutilizando o componente acima. Cada card deve ter as seguintes informações: Nome do curso, duração em horas e descrição.
No footer de cada card, deve haver um botão, que na verdade é um Link, que levará para a página do curso.

### Curso:
- Nome do curso e descrição
- O utilizador poderá ver todos os níveis e será obrigado a escolher um (por exemplo, utilizando um `<select>`)
- Ao seleccionar o nível, devem ser exibidas, em lista com checkbox, as 4 disciplinas.
- O user pode seleccionar apenas 2 das 4 disciplinas.
- O botão "Registar" só ficará habilitado para submeter quando todos os requisitos acima forem cumpridos.
- Ao se registar com sucesso, o utilizador deverá ser reencaminhado novamente para a homepage.

## Regras 🧭
- Não adicionar nenhuma dependência.
- Pode-se escrever inline styles ou usar ficheiros css. Recomenda-se, porém, usar css modules para a componentização (https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)
- Utilize REST para comunicar frontend com backend. Utilize `fetch` (https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch) no frontend, em vez de `axios` ou outras libs do género.
- O backend foi gerado com SQLITE para que os dados também fiquem no repositório. Para aceder ao painel admin, utilize o seguinte acesso: email `admin@admin.admin.com` e password `z.GGM6PpeDPK3gH`.

> Nota: o `.env` e o `.tmp` do backend foram removidos do `.gitignore` propositalmente para facilitar a configuração do início do projeto, embora não seja uma boa prática. Por favor, não os readicione ao `.gitignore`.
  
## Conselhos 😄
- Pode-se utilizar o estilo já existente no código de exemplo. Lá existem, por exemplo, cards.
- No backend, creio que não será necessário escrever código. Utilize o backoffice para criar os content-types e os relacionamentos.
- Organização é muito importante. Tente manter os componentes organizados, reutilizáveis e documentados sempre que possíveis. Documente da maneira que quiser, não é preciso seguir nenhum padrão. Ah, organização na hora de commitar também é muito importante, portanto nada de colocar tudo em um único commit!
- Tem dúvidas? Não hesite em mandar um e-mail. Estou sempre disponível para esclarecer o que for, até porque é possível que haja alguma falha nas minhas próprias instruções.

## Como entregar o seu projecto 📫
1. Faça clone deste repositório.
2. Quando concluir, envie um e-mail para o e-mail de candidatura com o link do seu repositório.

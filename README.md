# CAPACITAÇÃO VTEX - ENEXT - DESAFIO JAVASCRIPT

### CONTEXTO

Um dos conhecimentos técnicos mais importantes para um desenvolvedor front, sem dúvidas é o JavaScript. Dominar essa ferramenta, o torna apto  
desenvolver páginas dinâmicas e interativas. Utilizamos o JS basicamente todos os dias aqui na ENEXT, seja com React ou outra biblioteca. Mas uma coisa é certa. Ele sempre vai estar lá de alguma forma!

### DESAFIO TECH
Utilizando os conhecimentos já adquiridos em HTML, CSS em conjunto com o JavaScript. Desenvolver um aplicativo que exibe a temperatura em tempo real. Utilizem as referências!
Regras:
- O layout é livre use sua criatividade!
- Utilizar a fetch API do JS para consultar os dados na api de Clima da openweathermap(DOC da API nas referências).

O que deve ser exibido:
- Ícone que representa a condição climática
  - A API retorna o nome do ícone, podem utilizar isso em seu favor: https://openweathermap.org/weather-conditions#How-to-get-icon-URL
- A temperatura em graus celsius (API devolve essa informação na resposta, mas em Kelvin).
- Descrição do Clima Ex: ‘light rain’ (A API também devolve essa informação na resposta, podem utilizar a descrição que for devolvida na íntegra).
- O aplicativo deve possuir um botão para salvar as informações do clima atual(ícone, temperatura, descrição) e sua  respectiva data e horário Pode ser a data e horário no momento do clique no botão) . Definir qual seria o melhor local para salvar por exemplo: cookies ou localstorage.
- O aplicativo deve também listar essas informações salvas anteriormente. Se não possuir, não exibir nada.

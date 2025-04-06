# Mapa do Brasil
Projeto utilizando a biblioteca JavaScript [Leaflet](https://leafletjs.com/download.html) versão 1.9.4

## Objetivos do projeto
- Mapa do Brasil customizado com a cor Cinza, com as linhas dos estados Branca e os arredores do mapa na cor Branca
- Demarcações nos estados proporcionais à quantidade de usuários
- O mapa deve ser genérico, dando a possibilidade de ser utilizado em outros componentes do projeto, passando as cores desejadas e os dados referentes ao estados

## Para rodar o projeto
- Abra o projeto e no terminal instale o gerenciador de pacotes npm (Node Package Manager) com o comando `npm install`
- Rode o projeto com o comandp `ng s --o`

## Como utilizar o Leaflet
- Para utilizar o Leaflet em seu projeto, faça a instalação através do comando `npm install leaflet`
- Adicione o arquivo de estilos do Leaflet: 

```json
"styles": [
  "src/styles.css",
  "node_modules/leaflet/dist/leaflet.css"
],
```
- Importar o Leaflet no componente:
```typescript
import * as L from 'leaflet';
```
- Adicionar no html do componente, o elemento com o id 'map' para renderizar o mapa:

```html
<div id="map" style="height: 500px;"></div>
```
# FastFeet

![Img](https://github.com/Gabrielpdev/FastFeet/blob/master/Img/img.jpg)

### 📜 Sobre
Este é um projeto de um serviço de gestão e acompanhamento de encomendas para uma transportadora fictícia. Construído com as tecnologias mais populares do mundo Javascript, este repositório contem uma API REST (Node.js) como backend, uma aplicação em ReactJS como frontend e um app mobile em React Native.

A aplicação em **Node.js** (backend) é uma **API REST** escrita em **Node.JS** que serve dados ao frontend e ao mobile.

A aplicação em **ReactJS** (frontend) é para o administrador. Assim podendo direcionar e fazer gestão das entregas e outros registros.

A aplicação em **React Native** é para o entregador visulizar as entregas e trabalhar encima delas. Podendo filtrar entre pendentes e entregues, cadastrar problemas que ocorreram durante a entrega e confirmar a entrega enviando uma foto da assinatura.

### 🔽 Requisitos
1. Ter o **NodeJs** e o **Yarn** instalado
2. Ter instâncias do **Redis** e **PostgreSQL** em execução
3. Um dispositivo ou emulador **Android** conectado ao computador

### :rocket: Começando
1. ``git clone https://github.com/Gabrielpdev/FastFeet.git``
2. ``cd FastFeet``

### :rocket: Iniciando com o backend
1. ``cd Backend``
2. ``yarn``
3. ``Criar o arquivo .env com base no .env.example``
4. ``yarn sequelize db:migrate``
5. ``yarn sequelize db:seed:all``
6. ``yarn dev``

### 💻 Iniciando com o Front-end 
1. ``cd Frontend``
2. ``yarn``
3. ``yarn start``

Usuário administrador padrão: admin@fastfeet.com / 123456

### 📱Iniciando com o Mobile (Apenas Android)
1. ``cd mobile``
2. ``yarn``
3. ``adb reverse tcp:3333 tcp:3333``
4. ``react-native start``
5. ``react-native run-android``

### 🧰  Ferramentas utilizadas
- ⚛️ **ReactJs** - Biblioteca Javascript para criar interfaces de usuário.
- ⚛️ **React Native** - Framework para criar apps nativos usando React.
- 💅 **Styled Components** - Biblioteca Javascript pra estilizar componentes.
- 🔁 **Redux** - Biblioteca JavaScript de código aberto para gerenciar o estado do aplicativo.
- 🔂 **Redux Saga** - Biblioteca Javascript que torna os efeitos colaterais do aplicativo mais faceis de gerenciar.
- 📛 **Sentry** - Plataforma para monitoramento de erros e notificação em tempo real.
<hr>

<p align="center">
  <img src='./Img/Web.gif'>
  <img src='./Img/GIF-200507_151949%5B1%5D.gif'>
</p>

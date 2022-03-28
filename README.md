
<div align="center" style="margin-bottom:20px" height="500px">
  <img src="https://user-images.githubusercontent.com/63200402/160459911-f68ee24d-2a79-45c9-b49a-03534b06d2d8.png"/>
</div>


<div align="center">
  <h1 style="font-size:48px">ig.news</h1>
</div>

Um blog por assinatura, direcionado ao universo React.


## Screenshot 📷 

<div align="center" height="500px">
  <img src="https://user-images.githubusercontent.com/63200402/160456306-1867acd0-5090-4b17-a0d7-10861305e8b0.png"/>
</div>

# Technologies 🚀
* [Stripe](https://stripe.com/br)
* [Next.js](https://nextjs.org/)
* [Sass](https://sass-lang.com/)
* [Prismic](https://prismic.io/)

# Demonstration 🎥 

https://user-images.githubusercontent.com/63200402/160454781-54ca079d-16b2-4771-b608-25862a8853db.mp4


# Motivation 💪 
* Projeto desenvolvido com intuito de aprender/fixar os principais conceitos de next.js 
 

# How to run 💻
```
  # Clone Repository
  $ git clone https://github.com/renanloureiroo/ignews-treino.git
```
```
  # Criar arquivo .env.local e preencher as variáveis
  #faunadb
  FAUNADB_SECRET_KEY=

  #stripe
  STRIPE_API_KEY=
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY=

  STRIPE_SUCCESS_URL=http://localhost:3000/posts
  STRIPE_SUCCESS_CANCEL=http://localhost:3000/


  #github
  GITHUB_ID=
  GITHUB_SECRET=
```

```
  # Install Dependencies
  $ yarn

  # Run application
  $ yarn dev
```

# License
[MIT](https://choosealicense.com/licenses/mit/)
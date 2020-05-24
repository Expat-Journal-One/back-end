exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      return knex("users").insert([
        {
          id: 1,
          username: "Lnly_Trvlr",
          firstName: "Johnny",
          password: "JohnnyAppleSEED1234",
          location: "Manhattan, NY",
        },
        {
          id: 2,
          username: "AwesomeExpat",
          firstName: "Cassey",
          password: "jioiln_1234",
          location: "Boston, MA",
        }
      ]);
    })
    .then(() => knex('stories').truncate())
    .then(function () {
      return knex("stories").insert([
        {
          id: 1,
          title: "Working Abroad",
          location: "Hong Kong",
          description:
            "The Sights, the People, The FOOD!!!! Even though I work most of the time my visit here has been nothing but amazing. I don't know how I will live with American Dim-Sum again!!!!",
          date: "March, 14 2018",
          image:
            "https://images.pexels.com/photos/2861883/pexels-photo-2861883.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          user_id: 1,
        },
        {
          id: 2,
          title: "I Quit",
          location: "Kauai, Hawaii",
          description:
            "I quit my job and took a trip to Hawaii. Something that I always wanted to do. And when I get back I'm going to trekking across Europe. I have my departure ticket with no plans to return anytime soon. Suck it Bob! ",
          date: "February, 14 2019",
          image:
            "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          user_id: 2,
        },
        {
          id: 3,
          title: "Discount Tickets",
          location: "Hong Kong",
          description:
            "I'm back! Nothing could keep me away from that tasty Dim Sum. I've got a problem...",
          date: "April, 1 2018",
          image:
            "https://images.unsplash.com/photo-1559329255-2e7cb2e21ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          user_id: 1,
        },
        {
          id: 4,
          title: "Stranded",
          location: "India I think",
          description:
            "TBH not even sure how I got here. One day I was riding an overcrowded train and now I think I'm in India... Well the food is definitely spicy... I would know more if my phone could find a decent signal. How am I even posting this rn?",
          date: "March, 14 2020",
          image:
            "https://images.pexels.com/photos/1707402/pexels-photo-1707402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          user_id: 2,
        },
        {
          id: 5,
          title: "Where Am I Even",
          location: "Someplace cold?",
          description:
            "It's chilly... Still not sure where I am!!!!",
          date: "April, 10, 2019",
          image:
            "https://images.pexels.com/photos/54206/pexels-photo-54206.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          user_id: 2,
        },
      ]);
    })
}
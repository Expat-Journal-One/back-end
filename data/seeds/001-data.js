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
          image: "",
          user_id: 1,
        },
        {
          id: 2,
          title: "I Quit",
          location: "Kauai, Hawaii",
          description:
            "I quit my job and took a trip to Hawaii. Something that I always wanted to do. And when I get back I'm going to trekking across Europe. I have my departure ticket with no plans to return anytime soon. Suck it Bob! ",
          date: "February, 14 2019",
          image: "",
          user_id: 2,
        },
        {
          id: 3,
          title: "Discount Tickets",
          location: "Hong Kong",
          description:
            "I'm back! Nothing could keep me away from that tasty Dim Sum. I've got a problem...",
          date: "April, 1 2018",
          image: "",
          user_id: 1,
        },
        {
          id: 4,
          title: "Stranded",
          location: "India I think",
          description:
            "TBH not even sure how I got here. One day I was riding an overcrowded train and now I think I'm in India... Well the food is definitely spicy... I would know more if my phone could find a decent signal. How am I even posting this rn?",
          date: "March, 14 2020",
          image: "",
          user_id: 2,
        },
        {
          id: 5,
          title: "Where Am I Even",
          location: "Someplace cold?",
          description:
            "The Sights, the People, The FOOD!!!! Even though I work most of the time my visit here has been nothing but amazing. I don't know how I will live with American Dim-Sum again!!!!",
          date: "March, 14 2020",
          image: "",
          user_id: 2,
        },
      ]);
    })
}
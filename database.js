const books=[{
  ISBN:"12BOOK",
  title:"Tesla",
  pubDate:"2023-11-10",
  language:"en",
  numPage:"250",
  author:[1,2],
  pub:[1],
  category:["tech","space","education"]
}
]

const authors=[
  {
  id:"1",
  name:"Payal",
  books:["123Book","abcBook","12BOOK"]
},
{
id:"2",
name:"Elon Musk",
books:["123Book","12BOOK"]
}
]

const publishers=[
  {
  id:"1",
  name:"writex",
  books:["123Book"]
},
{
id:"2",
name:"writex2",
books:[]
}
]

module.exports={books,authors,publishers};

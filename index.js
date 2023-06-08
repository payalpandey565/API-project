const express= require("express");

//database
const database=require("./database");
//initialise express

const booky=express();
/*
Route           /
Description    get all Books
Access         public
Parameter      none
Methods        get
*/

booky.get("/",(req,res)=>{
  return res.json ({books: database.books});

});

/*
Route           /is
Description    get specified book
Access         public
Parameter      ISBN
Methods        get
*/

booky.get("/is/:isbn",(req,res)=>{
  const getSpecificBook=database.books.filter(
    (book)=>book.ISBN=== req.params.isbn
  );
  if(getSpecificBook.length===0){
    return res.json({error:`No book found for the isbn ${req.params.isbn}`});
  }

  return res.json({book:getSpecificBook});

});

/*
Route           /c
Description    get specified category
Access         public
Parameter      category
Methods        get
*/


booky.get("/c/:category",(req,res)=>{
  const getSpecificBook=database.books.filter(
    (book)=>book.category.includes(req.params.category)
  );
  if(getSpecificBook.length===0){
    return res.json({error:`No book found for the category ${req.params.category}`});
  }

  return res.json({book:getSpecificBook});

});


/*
Route           /l
Description    get specified language
Access         public
Parameter      language
Methods        get
*/


booky.get("/l/:language",(req,res)=>{
  const getSpecificBook=database.books.filter(
    (book)=>book.language.includes(req.params.language)
  );
  if(getSpecificBook.length===0){
    return res.json({error:`No book found for the language ${req.params.language}`});
  }

  return res.json({book:getSpecificBook});

});


/*
Route           /aa
Description    get all Authors
Access         public
Parameter      none
Methods        get
*/

booky.get("/author",(req,res)=>{
  return res.json ({authors: database.authors});

});


/*
Route           /id
Description    get specified author base on id
Access         public
Parameter      author id
Methods        get
*/

booky.get("/author/:id",(req,res)=>{
  const getSpecificAuthor=database.authors.filter(
    (author)=>author.id=== req.params.id
  );
  if(getSpecificAuthor.length===0){
    return res.json({error:`No author found for the id ${req.params.id}`});
  }

  return res.json({authors:getSpecificAuthor});

});


/*
Route           /isbn
Description    get specified author based on books
Access         public
Parameter      books id
Methods        get
*/

booky.get("/author/book/:isbn",(req,res)=>{
  const getSpecificAuthor=database.authors.filter(
    (author)=>author.books.includes(req.params.isbn)
  );
  if(getSpecificAuthor.length===0){
    return res.json({error:`No author found for the book ${req.params.isbn}`});
  }

  return res.json({authors:getSpecificAuthor});

});


/*
Route           /publisher
Description    get all publishers
Access         public
Parameter      none
Methods        get
*/

booky.get("/publisher",(req,res)=>{
  return res.json ({publishers: database.publishers});

});


/*
Route           /id
Description    get specified publisher base on id
Access         public
Parameter      author id
Methods        get
*/

booky.get("/publisher/:id",(req,res)=>{
  const getSpecificPublisher=database.publishers.filter(
    (publisher)=>publisher.id=== req.params.id
  );
  if(getSpecificPublisher.length===0){
    return res.json({error:`No publisher found for the id ${req.params.id}`});
  }

  return res.json({publishers:getSpecificPublisher});

});


/*
Route           /isbn
Description    get specified publisher based on books
Access         public
Parameter      books id
Methods        get
*/

booky.get("/publisher/book/:isbn",(req,res)=>{
  const getSpecificPublisher=database.publishers.filter(
    (publisher)=>publisher.books.includes(req.params.isbn)
  );
  if(getSpecificPublisher.length===0){
    return res.json({error:`No publisher found for the book ${req.params.isbn}`});
  }

  return res.json({publishers:getSpecificPublisher});

});



booky.listen(3000, () => {
  console.log("Server is up and running");

});

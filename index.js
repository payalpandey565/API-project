require("dotenv").config();
const express= require("express");
const mongoose=require("mongoose")
var bodyParser=require("body-parser");

//database
const database=require("./database");
//initialise express

const booky=express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

 mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true,


}
).then(() => console.log('Connected!'));







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

/*
Route           /book/new
Description    add new book
Access         public
Parameter      none
Methods        post
*/

booky.post("/book/new",(req,res)=>{
  const newBook=req.body;
  database.books.push(newBook);
  return res.json({updated:database.books});
});


/*
Route           /author/new
Description    add new author
Access         public
Parameter      none
Methods        post
*/

booky.post("/author/new",(req,res)=>{
  const newAuthor=req.body;
  database.authors.push(newAuthor);
  return res.json({updated:database.authors});
});


/*
Route           /publisher/new
Description    add new author
Access         public
Parameter      none
Methods        post
*/

booky.post("/publisher/new",(req,res)=>{
  const newPublisher=req.body;
  database.publishers.push(newPublisher);
  return res.json({updated:database.publishers});
});

/*
Route           /publisher/new
Description    update publisher
Access         public
Parameter      book isbn
Methods        put
*/

//update publisher database
booky.post("/publisher/update/book/:isbn",(req,res)=>{

  database.publishers.forEach((pub) => {
    if (pub.id===req.body.pubId){
      return pub.books.push(req.params.isbn);
    }
  });

  //update book database
  database.books.forEach((book) => {
    if (book.ISBN===req.params.isbn){
      book.pub=req.body.pubId;
      return;
    }
  });

  return res.json(
    {
      books:database.books,
      publishers:database.publishers,
      message:"successfully updated"

     });

});

//DELETE

/*
Route           /book/delete
Description    delete book
Access         public
Parameter      book isbn
Methods        delete
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
  const updatedBookDatabase=database.books.filter(
    (book)=>book.ISBN!==req.params.isbn
  )
  database.books=updatedBookDatabase;
  return res.json({books:database.books});

});

/*
Route           /author/delete
Description    delete book
Access         public
Parameter      author id
Methods        delete
*/
booky.delete("/author/delete/:id",(req,res)=>{
  const updatedAuthorDatabase=database.authors.filter(
    (author)=>author.id!==req.params.id
  )
  database.authors=updatedAuthorDatabase;
  return res.json({authors:database.authors});

});

/*
Route           /book/delete/author
Description    delete an author frombook and vice versa
Access         public
Parameter      isbn,author id
Methods        delete
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
  //update book database



  database.books.forEach((book)=>{
    if(book.ISBN=== req.params.isbn){
      const newAuthorList=book.author.filter(
        (eachAuthor)=>eachAuthor!==parseInt(req.params.authorId)
      );

      book.author =newAuthorList;


    }

  });

  //update author database
  database.authors.forEach((eachAuthor)=>{
    if(eachAuthor.id === parseInt(req.params.authorId)){
      const newBookList= eachAuthor.books.filter(
        (book)=> book !== req.params.isbn
      );
      eachAuthor.books=newBookList;


    }
  });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(database.books));
 res.write(JSON.stringify(database.authors));
 res.end();

});

booky.listen(3000, () => {
  console.log("Server is up and running");

});

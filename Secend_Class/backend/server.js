import express from 'express'

const app = express();
const port = process.env.PORT_URL || 3000;

app.get('/', (req, res)=>{
    res.send("Hello WOrld!")
})

app.get("/api/user", (req, res)=>{
    const bookData = [
        {
            id:1,
            title:"Start free writing to find keywords",
            dec:""
        },
        {
            id:2,
            title:"Draw inspiration from your characters",
            dec:"Draw inspiration from your characters"
        },
        {
            id:3,
            title:"Keep your setting in mind",
            dec:"Keep your setting in mind"
        },
        {
            id:4,
            title:"Look for book title ideas in famous phrases ",
            dec:"Look for book title ideas in famous phrases "
        },
        {
            id:5,
            title:"Analyze the book titles of other books",
            dec:"Analyze the book titles of other books"
        },
        {
            id:6,
            title:"Don’t forget the subtitle",
            dec:"Don’t forget the subtitle"
        },
    ]
    res.send(bookData)
})

app.listen(port, ()=>{
    console.log("Run Server...", port)
})
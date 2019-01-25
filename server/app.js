const express = require("express");
const graphQLHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose  = require("mongoose");

const app  = express();

// connect to mongodb database

mongoose.connect("mongodb://localhost:27017/graphql",{ useNewUrlParser: true } );

mongoose.connection.once('open',() => {
	console.log("connected to database");
});


app.use("/graphql",graphQLHTTP({
 schema,
 graphiql:true
}));


app.listen(4000,()=>{
	console.log("now listening for requests on port 4000")
})
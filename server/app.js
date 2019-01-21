const express = require("express");
const graphQLHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app  = express();

app.use("/graphql",graphQLHTTP({
 schema,
 graphiql:true
}));


app.listen(4000,()=>{
	console.log("now listening for requests on port 4000")
})
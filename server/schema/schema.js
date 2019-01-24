const graphql = require("graphql");
const _ = require("lodash");

const {
	GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt

} = graphql;

//dummy data 
 var books = [
   {name:'Name of the Wind',genre:'Fantasy',id:"1",authorId:"1"},
   {name:'The Final Empire',genre:'Fantasy',id:"2",authorId:"2"},
   {name:'The Long Earth',genre:'Sci-Fi',id:"3",authorId:"1"},
   {name:'Learn PHP',genre:'Programming',id:"4",authorId:"3"},
   {name:'You Don\'t Know Js',genre:'Programming',id:"5",authorId:"5"},
   {name:'React js',genre:'Programming',id:"6",authorId:"4"},
   {name:'React Native For You',genre:'Programming',id:"7",authorId:"4"},
   {name:'Hello Py',genre:'Programming',id:"8",authorId:"2"},
   {name:'Laravel Tuto',genre:'Programming',id:"9",authorId:"3"},
 ];

var authors = [
    {name:"Patrick Rothfuss",age:44,id:"1"},
    {name:"Brandon Sanderson",age:25,id:"2"},
    {name:"Terry Pratchet",age:66,id:"3"},
    {name:"Hary Inderson",age:58,id:"4"},
    {name:"Brad Kerly",age:32,id:"5"},
];

const BookType = new GraphQLObjectType({
   name:"Book",
   fields:() => ({
   	id:{type:GraphQLID},
   	name:{type:GraphQLString},
   	genre:{type:GraphQLString},
   	author:{
   		type:AuthorType,
   		resolve(parent,args){
   			console.log(parent);
   			// search for id in parent (books) author id 
   			return _.find(authors,{id:parent.authorId});
   		}
   	}
   })
}); 

const AuthorType = new GraphQLObjectType({
  name:"Author",
  fields:() =>({
  	id:{type:GraphQLID},
  	name:{type:GraphQLString},
  	age:{type:GraphQLInt}
  })
});

const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields: {
		book:{
			type:BookType,
			args:{ id:{type:GraphQLID} },
			resolve(parent,args){
				//code to get data from db / other source
             return _.find(books,{id:args.id});

			}
		},
		author:{
			type:AuthorType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				return _.find(authors,{id:args.id});
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query:RootQuery
})
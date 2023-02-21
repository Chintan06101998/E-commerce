/*Create database: use DATABASE_NAME
To check your currently selected database, use the command db
db.dropDatabase()
TO Create collection:- db.createCollection(name, options) 
Drop() method is used to drop the databse
•	Mongosh
•	Use bookstore
•	Show collections
•	Db.books.find()
•	Find data with sorting
o	db.books.find().sort({author:1})
o	1 is assendign -1 is decending
•	Find , sort and limit
o	db.books.find().sort({author:1}).limit(2)
•	Less than
o	db.books.find({rating:{$lt:9}})
•	Grater than
o	db.books.find({rating:{$gt:9}})
•	Grater than with other prop
o	db.books.find({rating:{$gt:9},author:"Chintan"})
•	Author is chintan OR rating is 9
o	db.books.find({$or:[{author:"Chintan"},{rating:9}]})
•	This three name NOT IN
o	db.books.find({author:{$nin:["Chintan","Chintu","Deep"]}})
•	This three name IN
o	db.books.find({author:{$in:["Chintan","Chintu"]}})
•	This provide the name if we have two and two are available then it shows that data
o	db.books.find({"review.name":{$all:["Joy patel"]}})
•	This is for specific one
o	db.books.find({"review.name":"smit"})
•	This is for nested Map
o	db.books.find({"stocks.price":188})
•	This is for single delete
o	Db.books.deleteOne({author:”Shahu”})
•	This is for many delete
o	db.books.deleteMany({author:”Shahu”})
•	TO update the document
•	UpdateOne() method needs two parameter: (_ID, SET operator with the data which we wanted to update)
•	db.books.updateMany({author:"Chintan"},{$set:{author:"Chintankumar"}})
•	db.books.updateOne({_id:ObjectId("63be3d2077b436bfb3341e3e")},{$set:{name:"Don no 1",rating:7.5}})
•	We use INC to increase the value without knowing it
o	db.books.updateOne({_id:ObjectId("63be3d2077b436bfb3341e3e")},{$inc:{rating:3}})
o	db.books.updateOne({_id:ObjectId("63be3d2077b436bfb3341e3e")},{$inc:{rating:-3}})
•	In order to update the array of object, we use $PUSH and PULL object. It is one kind of insert and remove operation on array
o	For example I Have set like 
o	{_id:xxxxx,
Hobbies: [cricket,hockey,volleyball]
}
o	Now I want to update the hobbies and I want to remove volleyball 
o	Db.books.updateOne({_id:xxxx}, {$PULL: {Hobbies: “volleyball”} } )
o	Now I want to add volleyball
o	Db.books.updateOne({_id:xxxx}, {$PUSH: {Hobbies: “volleyball”} } )
o	In order to enter several item in array we use EACH operator
o	Db.books.updateOne({_id:xxxx}, {$PULL: {Hobbies: {$EACH:[“Cards, football, bedminton”]} } } )


Aggregation

Aggregation operations process multiple documents and return computed results. You can use aggregation operations to

 the aggregation pipeline is a multi-stage pipeline,

 In UNIX command, shell pipeline means the possibility to execute an operation on some input and use the output
  as the input for the next command and so on. MongoDB also supports same concept in aggregation framework. 
  There is a set of possible stages and each of those is taken as a set of documents as an input and 
  produces a resulting set of documents (or the final resulting JSON document at the end of the pipeline). 
  This can then in turn be used for the next stage and so on.

so in each state, the documents taken as input and produce the resultant set of documents now in the next stage(id available) the resultant documents taken as input and produce output, this process is going on till the last stage. 
•	Group values from multiple documents together.
•	Perform operations on the grouped data to return a single result.
•	Analyze data changes over time.
•	Displaying details of students whose age is greater than 30 age
Db.student.aggregate($match:[])

db.students.aggregate([{$group: {_id:"$sec", total_st: {$sum:1}, max_age:{$max:"$age"} } }])

db.listingsAndReviews.aggregate(
    [ { $group : { _id : "$property_type" } } ]) 


    Indexes support the efficient resolution of queries. Without indexes, MongoDB must scan every document of a 
    collection to select those documents that match the query statement. This scan is highly inefficient and 
    require MongoDB to process a large volume of data.

Indexes are special data structures, that store a small portion of the data set in an easy-to-traverse form. 
The index stores the value of a specific field or set of fields, ordered by the value of the field as specified in the index.

db.COLLECTION_NAME.createIndex({KEY:1})
db.COLLECTION_NAME.dropIndexes()

getIndex()
This method returns the description of all the indexes int the collection.

*/


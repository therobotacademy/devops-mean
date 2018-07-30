## Create database and change to it
db
use conFusion
db
db.help()


## create a collection named, insert a new dish document in the collection dishes and print it
db.dishes.insert({ name: "Uthappizza", description: "Test" });
db.dishes.find().pretty();


#### Next, we will learn the information encoded into the ObjectId by typing the following at the prompt
var id = new ObjectId();
id.getTimestamp();

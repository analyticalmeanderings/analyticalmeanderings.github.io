exports = function(arg){
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    collection.findOne({ owner_id: context.user.id }).then((doc) => {
      // do something with doc
    });

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  return {arg: arg};
//   curl --request POST \
// --url https://api.sendgrid.com/v3/mail/send \
// --header 'Authorization: Bearer *****' \
// --header 'Content-Type: application/json' \
// --data '{"personalizations":[{"to":[{"email":"john.doe@example.com","name":"John Doe"}],"subject":"Hello, World!"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"sam.smith@example.com","name":"Sam Smith"},"reply_to":{"email":"sam.smith@example.com","name":"Sam Smith"}}'
  
  
  
  
  
  
  
};


exports = function(payload) {

  let url = `https://api.sendgrid.com/v3/mail/send`;
  console.log("Fetching " + url);
  return context.http.post( {url: url}).then(response => {
    
    let json = JSON.parse(response.body.text());
    
    var collection = context.services.get('mongodb-atlas').db('news_articles').collection('news');
    collection.insertOne(json);
    console.log('Inserted document!');
  });
};
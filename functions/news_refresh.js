
// exports = function() {
//   /*
//     A Scheduled Trigger will always call a function without arguments.
//     Documentation on Triggers: https://docs.mongodb.com/realm/triggers/overview/

//     Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

//     Access a mongodb service:
//     const collection = context.services.get(<SERVICE_NAME>).db("<DB_NAME>").collection("<COLL_NAME>");
//     const doc = collection.findOne({ name: "mongodb" });

//     Note: In Atlas Triggers, the service name is defaulted to the cluster name.

//     Call other named functions if they are defined in your application:
//     const result = context.functions.execute("function_name", arg1, arg2);

//     Access the default http client and execute a GET request:
//     const response = context.http.get({ url: <URL> })

//     Learn more about http client here: https://docs.mongodb.com/realm/functions/context/#context-http
//   */
  
//   var url = 'http://api.mediastack.com/v1/news?access_key=89dcc6770900488a730bb00004d7596d&keywords=pharmaceutical';
//   var req = new Request(url);
//   console.log("Fetching " + url);

//   fetch(req)
//       // TODO
//       .then(function(response){
//         return response.json();
//       })
//       .then(function(data) {
//         var article_data = data['data'];
//         var article_titles = '<p>';
//         for (let article = 0; article < 10; article++) {
//           article_titles+=article_data[article]['title'];
//           article_titles+='         ';
//         }
//         article_titles+='</p>';
        
//         var collection = context.services.get('mongodb-atlas').db('news_articles').collection('news');
        
//         collection.insertOne(json);
        
//         console.log('Inserted document!');
//         //document.getElementById('alert_content').innerHTML += article_titles;
//       })
//       .catch(err => {
//         console.error(err);
//       });
// };

exports = function(payload) {

  let url = "http://api.mediastack.com/v1/news?access_key="+context.values.get("API_MEDIASTACK")+"&keywords=pharmaceutical&sources=-americanbankingnews";
  console.log("Fetching " + url);
  return context.http.get( {url: url}).then(response => {
    
    let json = JSON.parse(response.body.text());
    
    var collection = context.services.get('mongodb-atlas').db('news_articles').collection('news');
    collection.insertOne(json);
    console.log('Inserted document!');
  });
};

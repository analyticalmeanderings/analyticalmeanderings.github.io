exports = function(payload) {

  let url = "http://api.mediastack.com/v1/news?access_key="+context.values.get("API_MEDIASTACK_VALUE")+"&keywords=pharmaceutical&sources=-americanbankingnews";
  console.log("Fetching " + url);
  return context.http.get( {url: url}).then(response => {
    
    let json = JSON.parse(response.body.text());
    
    var collection = context.services.get('mongodb-atlas').db('news_articles').collection('news');
    collection.insertOne(json);
    console.log('Inserted document!');
  });
};

//example nyt api call, for election aticles between 1900 and 1910
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&&begin_date=19000101&end_date=19100101
var searchForm = document.querySelector("#article-search-form");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  document.querySelector("#article-section").innerHTML = "";

  var searchTerm = document.querySelector("#search-term").value;
  var artCount = document.querySelector("#num-articles").value;
  var beginDate = document.querySelector("#start-year").value;
  var endDate = document.querySelector("#end-year").value;

  var queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=bvZmzodWhUedf6RkOpKYXebjFw9ZhYHk&q=${searchTerm}`;

    if(beginDate){
        queryUrl+=`&begin_date=${beginDate}0101`
    }
    if(endDate){
        queryUrl+=`&end_date=${endDate}0101`
    }
console.log('queryUrl', queryUrl)
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < artCount; i++) {
        var thisArticle = data.response.docs[i];

        var headline = thisArticle.headline.main;
        var byline = thisArticle.byline.original;
        var pubDate = thisArticle.pub_date;
        var section = thisArticle.section_name;
        var urlLink = thisArticle.web_url;

        var newArticle = document.createElement("article");

        var headlineH3 = document.createElement("h3");
        headlineH3.textContent = headline;
        newArticle.append(headlineH3);

        var bylineH4 = document.createElement("h4");
        bylineH4.textContent = byline;
        newArticle.append(bylineH4);

        var sectionH4 = document.createElement("h4");
        sectionH4.textContent = section;
        newArticle.append(sectionH4);

        var dateP = document.createElement("p");
        dateP.textContent = dayjs(pubDate).format("dddd MMM DD, YYYY");
        newArticle.append(dateP);

        var linkA = document.createElement("a");
        linkA.textContent = "see full article";
        linkA.setAttribute("href", urlLink);
        linkA.setAttribute("target", "_blank");
        newArticle.append(linkA);

        document.querySelector("#article-section").append(newArticle);
      }
    });
});

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


  const renderTweets = (tweets) => {
  $("tweet-container").empty();

  tweets.forEach((tweet) => {
    const tweetElement = createTweetElement(tweet)
    $("#tweet-container").append(tweetElement);
  });

};



const createTweetElement = (tweetObj) => {
  const $tweet = `
  <article class="post">
  <header class="user-info">
    <div class="user-profile">
      <img class="user-profile-pic" src="${tweetObj.user.avatars}"></img>
      <p>${tweetObj.user.name}</p>
    </div>
    <p class="user-id">${tweetObj.user.handle}</p>
  </header>

  <div class="input">
    <p class="input-value">${tweetObj.content.text}</p>
    <div class="border"></div>
  </div>

  <footer class="footer">
    <p>${timeago.format(tweetObj.created_at)}</p>
    <div class="post-icons">
      <i class="fas fa-thumbs-up"></i>
      <i class="fas fa-comment"></i>
      <i class="fas fa-flag"></i>
    </div>
  </footer>

</article>
  `;
  return $tweet;
};

$(document).ready(() => {

  $('#post-tweet').on('submit', (event) => {
    event.preventDefault();
    const userData = $('#tweet-text').serialize();
    $.ajax({
      method:'POST',
      url:'/tweets',
      data: userData,
    }).then(() => {
      console.log("Successfully created");
    })
  })

  //FETCH THE DATA(TWEETS)
  const loadTweets = () => {
    $.ajax({
      method:'GET',
      url:'/tweets'
    }).then((res) => {
      renderTweets(res);
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };
loadTweets()

  renderTweets(data);
});

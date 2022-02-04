/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

//APPEND THE NEW POST EVERYTIME IT GETS A NEW POST
const renderTweets = (tweets) => {
  $("#tweet-container").empty();

  tweets.forEach((tweet) => {
    const tweetElement = createTweetElement(tweet);
    $("#tweet-container").prepend(tweetElement);
  });
};

//PREVENT XSS(USER CAN'T INPUT JAVASCRIPT) ESCAPE METHOD
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
    <p class="input-value">${escape(tweetObj.content.text)}</p>
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
  $("#post-tweet").on("submit", function (event) {
    event.preventDefault();
    const userData = $(this).serialize();
    const tweetLength = $("#tweet-text").val().length;
  


    //VALIDATE TO SEE IF THE CRITERIA MEETS
    if (tweetLength > 140) {
      $(".warning-sign").slideDown();
      const $warningMessage = $(".warning-message");
      $warningMessage.html("You cannot enter more than 140 characters!");
      $(".warning").css({'display': 'flex'})
      setTimeout(() => {
        $(".warning-sign").slideUp();
      }, 5000);

    } else if (tweetLength === null || tweetLength === 0) {
      $(".warning-sign").slideDown();
      const $warningMessage = $(".warning-message");
      $warningMessage.html("This field cannot be empty!");
      $(".warning").css({'display': 'flex'})
      setTimeout(() => {
        $(".warning-sign").slideUp();
      }, 5000);
    } else {
      //THIS ALLOWS THE BROWSER TO SUBMIT THE FORM WITHOUT REFRESHING
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: userData,
        success: () => {
          loadTweets();
          console.log("success");
          $(".warning-sign").slideUp(); 
        },
      });
    }

    $("#post-tweet").trigger("reset"); //CLEAR INPUT AFTER SUBMITTING
  });

  //FETCH THE DATA(TWEETS)
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then((res) => {
        renderTweets(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  loadTweets();

  renderTweets(data);

  //RESET THE COUNTER ONCE THE FORM IS SUBMITTED
  //FIRST POST DOESNT SLIDE DOWN, JUST POPS UP
});

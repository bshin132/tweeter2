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
    //GET THE LENGTH OF THE INPUT
    event.preventDefault();
    const userData = $(this).serialize();
    const tweetLength = $("#tweet-text").val().length;

    //VALIDATE TO SEE IF THE CRITERIA MEETS
    if (tweetLength > 140) {
      $(".warning-sign").slideDown();
      const $warningMessage = $(".warning-message");
      $warningMessage.html("You cannot enter more than 140 characters!");
      $(".warning").css({ display: "flex" });
      $(".counter").text("140").css({ color: "#545149" });
      $("#post-tweet").trigger("reset");

      setTimeout(() => {
        $(".warning-sign").slideUp();
      }, 5000);
      return;
    }
    if (tweetLength === null || tweetLength === 0) {
      $(".warning-sign").slideDown();
      const $warningMessage = $(".warning-message");
      $warningMessage.html("This field cannot be empty!");
      $(".warning").css({ display: "flex" });
      setTimeout(() => {
        $(".warning-sign").slideUp();
      }, 5000);
      return;
    }

    //THIS ALLOWS THE BROWSER TO SUBMIT THE FORM WITHOUT REFRESHING
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: userData,
      success: () => {
        loadTweets();
        console.log("success");
        $(".warning-sign").slideUp();
        $(".counter").text("140");
      },
    });
    $("#post-tweet").trigger("reset");
  });

  //STRETCH FORM TOGGLE
  $(".fa-angle-double-down").on("click", function (event) {
    event.preventDefault();
    $(".new-tweet").slideToggle(1000);
    $("#tweet-text").focus();
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
});

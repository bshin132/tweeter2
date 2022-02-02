$(document).ready(function() {
  
  $('#tweet-text').on('input', function() {    //this keyword refers to the selected element, in this case ('#tweet-text')
    //get the length of input value
    $numberOfValues = $(this).val().length;

    $calculatedValue = 140 - $numberOfValues;

    //go to .button-count(parent) and inside, find .counter(sibling), good practice use 'this' to traverse thru trees instead of grabbing it directly
    $counter = $(this).siblings('.button-count').find('.counter');   

    //set the counter value to calculated value
    $counter.html($calculatedValue);


    if ($calculatedValue < 0) {
      $counter.css({'color': '#ff0000'})
    } else {
      $counter.css({'color': '#545149'})
    }

  })

});
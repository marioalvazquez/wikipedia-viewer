$('#search-form').submit((event) =>{
  event.preventDefault();
  $('.search-main, .search-nav').removeClass('search-start').show('slow');
  const prevResults = $('.panel');
  if(prevResults.length){
    $(prevResults).fadeOut();
    $(prevResults).remove();
  }
  const query = $('#search-input').val();
  if(!query)
  {
    $('.search-main, .search-nav').addClass('search-start');
    return alert("Please type something to search first.");
  }
  search(query);
});

function logRes(res) {
  const result = res.slice(1,4);
  result[0].forEach((i) =>{
    $('.search-results').append(
      '<div class="panel">' +
        '<div class="heading">' +
          '<h2 class="title">' +
          '</h2>' +
        '</div>' +
        '<div class="body">' +
          '<div class="brief">' +
            '<p></p>' +
          '</div>' +
        '</div>' +
        '<div class="footer">' +
        '<p class="more"><a href="" target="_blank">Keep Reading <i class="material-icons">keyboard_arrow_right</i></a></p>' +
        '</div>' +
      '</div>'
    ).hide().show('slow');
  });
  fillBox('.panel', result);
  $('.main-footer').removeAttr('style');
}

function fillBox(selector, result) {
  $(selector).each((index, item) =>{
    $(item).find('.title').text(result[0][index]);
    $(item).find('.brief p').text(result[1][index]);
    $(item).find('a').attr('href', result[2][index]);
  });
}

function search(query){
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    data:{
      action: 'opensearch',
      format: 'json',
      search: query
    },
    success: res => {
      logRes(res);
    },
    fail: res =>{
      console.log(`We failed with: ${res}`);
    }
  });
}

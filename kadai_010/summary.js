$(function () {
  //文字色を赤に変更
  $('#change-color').on('click', function () {
    $('#target').css('color', 'red');
  });

  //文字内容を「Hello!」に変更
  $('#change-text').on('click', function () {
    $('#target').text('Hello!');
  });

  // フェードアウトで非表示
  $('#fade-out').on('click', function () {
    $('#target').fadeOut();
  });

  // フェードインで表示
  $('#fade-in').on('click', function () {
    $('#target').fadeIn();
  });
});
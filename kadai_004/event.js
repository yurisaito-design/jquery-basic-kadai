//HTMLドキュメントが読み込み完了したとき
$(window).on('load', function () {
  console.log('loadイベントが発生しました');
});
$(function () {
  //画面をスクロールしたとき
  $(window).on('scroll', function () {
    console.log('scrollイベントが発生しました');
  });
});
$(function () {
  // ボタンアニメーション
  $('.button-more').on('mouseover', function () {
    $(this).animate({
      opacity: 0.5,
      //opacity:透明度
      marginLeft: 20,
    }, 100);
    //アニメーションが完了するまでにかかる時間が 100ミリ秒（0.1秒）
  });
  $('.button-more').on('mouseout', function () {
    $(this).animate({
      opacity: 1.0,
      marginLeft: 0
    }, 100);
  });

  // カルーセル
  $('.carousel').slick({
    autoplay: true,
    // 画像を自動で切り替わる
    dots: true,
    // カルーセルの下に現在地を示すUI（ドット）を表示
    infinite: true,
    // 画像をループ
    autoplaySpeed: 5000,
    // 5秒ごとに画像を切り替える
    arrows: false,
    // カルーセルの左右の矢印を非表示にする
  });

  // 送信ボタンクリック時の処理
  $('submit').on('click', function (event) {
    // formタグによる送信を拒否 ※送信ボタンを押されてもすぐ読み込まないようにする
    event.preventDefault();

    // 入力チェックした結果をresultに格納
    let result = inputCheck();

    // エラー判定とメッセージを取得
    // result というオブジェクトの中にひとまとめにした「error」プロパティの値を取り出し、変数「error」に代入
    // 同様に、resultにひとまとめにした「message」プロパティの値を取り出し、変数「message」に代入
    // このコードの目的は、オブジェクト（result）から個別の値（errorとmessage）を取り出して扱いやすくすること
    let error = result.error;
    let message = result.message;

    // エラーが無かったらフォームを送信する
    if (eroor == false) {
      // errorが（false）出なかったら、フォーム送信は実際には行わず、送信成功のメッセージを表示する
      alert('お問い合わせを送信しました。')
    } else {
      // errorがtrueになったら、エラーメッセージを表示する
      alert(message);
    }
  });

  // フォーカスが外れた時（blur）にフォームの入力チェックをする
  $('#name').blur(function () {
    inputCheck();
  });
  $('#furigana').blur(function () {
    inputCheck();
  });
  $('#email').blur(function () {
    inputCheck();
  });
  $('#tel').blur(function () {
    inputCheck();
  });
  $('#message').blur(function () {
    inputCheck();
  });
  $('#agree').click(function () {
    inputCheck();
  });

  // お問い合わせフォームの入力チェック
  function inputCheck() {
    // エラーのチェック結果
    let result;

    // エラーメッセージのテキスト
    let message = '';

    // エラーがなければfalse、エラーがあればtrue
    let error = false;

    // お名前のチェック
    // .val()とは、フォームの入力値を取得または設定するためのもの。
    if ($('#name').val() == '') {
      // エラーあり
      $('#name').css('background-color', '#f79999');
      error = true;
      message += '尾根前を入力してください。 \n';
    } else {
      // エラーなし ※正常に入力したら背景がブルーになる
      $('#name').css('background-color', '#fafafa');
    }

    // フリガナのチェック
    if ($('#furigana').val() == '') {
      //エラーあり
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。 \n';
    } else {
      // エラーなし
      $('#furigana').css('background-color', '#fafafa');
    }

    // お問い合わせのチェック
    if ($('#message').val() == '') {
      // エラーあり
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    } else {
      // エラーなし
      $('#message').css('background-color', '#fafafa');
    }

    // メールアドレスのチェック ※||は「または」という意味。入力が空。または＠が無い。または.が無い場合のことを指している
    // .indexOf()とは、文字列（または配列）に特定の文字や要素が含まれているか を調べるために使う
    if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
      // エラーあり
      $('#email').css('background-color', '#f79999');
      error = true;
      message += 'メールアドレスが未記入、または「＠」「.」が含まれていません。\n';
    } else {
      // エラーなし
      $('#email').css('background-color', '#fafafa');
    }

    // 電話番号のチェック（未入力はOK、未入力でない場合は-が必要）
    // != ''は空文字列ではない（何か入力されている）」という意味。
    // &&は「かつ」「両方の条件が成り立つ場合のみ true」という意味。今回は、入力がある かつ -（ハイフン）が含まれていない場合はエラーありにする。ということ。
    if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
      // エラーあり
      $('#tel').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      // エラーなし
      $('#tel').css('background-color', '#fafafa');
    }

    // 個人情報のチェックボックスのチェック
    // .prop()とは、HTMLの（今の状態の）プロパティを取得する。チェックされていれば「true」 チェックされていなければ「false」を返す
    // ==は値だけを比較する。 ※=== は「値と型の両方を比較」（より厳密）
    if ($('#agree').prop('checked') == false) {
      // ↓フォーム全体のエラーを表すフラグを true にします。送信を止める目的で使用される変数。
      error = true;
      // +=は、「現在の値に、さらに何かを追加する」という意味。エラーになっったらメッセージを表示する
      message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
    }

    // エラーの有無で送信ボタンを切り替え
    // .attr()はHTML要素の属性（attribute）を取得する ※属性とは、HTMLのタグに付いている src や href、alt、id、class などのこと。
    // エラーが出たら（true）グレーアウトしてる画像を表示。エラーじゃなかったらブルーの画像を表示。
    if (error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    // オブジェクトでエラー判定とメッセージを返す
    // オブジェクトとは、複数の関連する値（情報）をまとめて管理できる構造のこと。
    // 今回だと、変数errorと変数messageの値を同時に返したいため、両者をオブジェクトとしてひとまとめにして変数resultに代入する（これでひとまとめにできる）
    result = {
      error: error,
      message: message
    }

    // 戻り値としてエラーがあるかどうかを返す（「return」にひとまとめにしている「error」「message」を戻り値としてresultに出す）
    return result;
  }

});
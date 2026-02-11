"user strict";
const userNameInput = document.getElementById("user-name");
const assesmentButton = document.getElementById("assessment");
const resultDevision = document.getElementById("result-area");
const tweetDivision = document.getElementById("tweet-area");

assesmentButton.addEventListener(
  "click", 
  //function(){
  () => {   // アロー関数
    const userName = userNameInput.value;
    if(userName.length === 0){
      // 名前が空の時は処理を終了する。
      console.log("文字を入力してください。")
      return;
    }

    // 診断結果表示エリアの作成
    resultDevision.innerText = "";  // 空文字上書き

    // headerDivisionの作成
    const headerDivision = document.createElement("div");
    headerDivision.setAttribute("class", "card-header text-bg-primary");
    headerDivision.innerText = "診断結果";

    // bodyDivisionの作成
    const bodyDivision = document.createElement("div");
    bodyDivision.setAttribute("class", "card-body");

    const paragraph = document.createElement("p");
    paragraph.setAttribute("class", "card-text");

    const result = assesment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);
    
    // resultDivision に Bootstrap のスタイルを適用
    resultDevision.setAttribute("class", "card");

    // headerDivitsion と bodyDivision を resultDivision に差し込む
    resultDevision.appendChild(headerDivision);
    resultDevision.appendChild(bodyDivision);

    // ツイートエリアの作成
    tweetDivision.innerText = "";

    const anchor = document.createElement("a");
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent("あなたのいいところ診断とRPG職業"); + "&ref_src=twsrc%5Etfw";

    anchor.setAttribute("href", hrefValue);
    anchor.setAttribute("class", "twitter-hashtag-button");
    anchor.setAttribute("data-text", result);
    anchor.innerText = "Tweet #あなたのいいところ診断とRPG職業";

    tweetDivision.appendChild(anchor);

    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    tweetDivision.appendChild(script);
  }
);

// Enterキーで診断する処理を追加
// ☆Enterキーを１度押しただけで反応していたので修正
let enterCount = 0; // Enterキーの押下回数をカウント
userNameInput.addEventListener(
  "keydown",
  (event) => {
    if(event.code === "Enter"){
      enterCount++; // Enterを認識したらカウント１増加

      if(enterCount >= 2){
        assesmentButton.dispatchEvent(new Event("click"));
        enterCount = 0; // カウントをリセット
      }
    }
    else {
      // Enter以外のキーが押されたらカウントをリセット
      enterCount = 0;
    }
  }
)

// ☆answers から goodPointAnswer に変数名を変更。ここでの変更はこれだけ。
// ☆マークは、課題を熟すために編集した場所。
const goodPointAnswers  = [
  "###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。",
  "###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。",
  "###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。",
  "###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。",
  "###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。",
  "###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。",
  "###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。",
  "###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。",
  "###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。",
  "###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。",
  "###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。",
  "###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。",
  "###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。",
  "###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。",
  "###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。",
  "###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。",
  '###userName###のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
]

// ☆いいところから職業へのマッピング
const jobMapping = {
  "声": "吟遊詩人",
  "まなざし": "魔法使い",
  "情熱": "戦士",
  "厳しさ": "暗黒騎士",
  "知識": "賢者",
  "ユニークさ": "錬金術師",
  "用心深さ": "盗賊",
  "見た目": "騎士",
  "決断力": "勇者",
  "思いやり": "僧侶",
  "感受性": "召喚士",
  "節度": "忍者",
  "好奇心": "狩人",
  "気配り": "弓使い",
  "そのすべて": "魔剣士",
  "自制心": "竜騎士",
  "優しさ": "僧侶"
};

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assesment(userName){
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for(let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添え字の数値を求める
  // ☆「answers」の部分を「goodPointAnswers」へ変更。
  const index = sumOfCharCode % goodPointAnswers.length;
  let result = goodPointAnswers[index];

  // TODO ###userName### をユーザの名前に置き換える
  result = result.replaceAll("###userName###", userName);
  // return result; // ☆必要ないと思うので削除。

  // ☆職業を取得
  const job = getJobFromGoodPoint(result);

  // ☆いいところ診断と職業診断を組み合わせた結果を返す
  result = result + "\nあなたに最適なRPG職業は「" + job + "」です！";
  return result;
}

/**
 * ☆いいところの診断結果から職業を取得する関数
 * @param {string} goodPointResult いいところ診断の結果文
 * @return {string} 職業名
 */
function getJobFromGoodPoint(goodPointResult) {
  // いいところのキーワードを抽出
  for (let key in jobMapping) {
    if (goodPointResult.includes("いいところは" + key)) {
      return jobMapping[key];
    }
  }
  return "冒険者"; // デフォルト値
}

// テストを行う関数
// ☆内容が変わったのでテストも修正。
function test(){
  console.log("診断結果の文章のテスト");

  // 太郎
  console.log("太郎");
  console.assert(
    assesment("太郎") === 
    "太郎のいいところはユニークさです。太郎だけのその特徴が皆を楽しくさせます。\nあなたに最適なRPG職業は「錬金術師」です！",
    "診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。"
  );

    // 次郎
  console.log("次郎");
  console.assert(
    assesment("次郎") === 
    "次郎のいいところはそのすべてです。ありのままの次郎自身がいいところなのです。\nあなたに最適なRPG職業は「魔剣士」です！",
    "診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。"
  );

  console.log("診断結果の文章のテストの終了");

}
test();





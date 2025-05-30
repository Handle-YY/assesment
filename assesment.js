"user strict";
const userNameInput = document.getElementById("user-name");
const assesmentButton = document.getElementById("assesment");
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
    //console.log(userName);

    resultDevision.innerText = "";  // 空文字上書き

    // 診断結果表示エリアの作成

    // 入れ子状態の要素は、子要素と言う。
    const header = document.createElement("h3");
    header.innerText = "診断結果";
    resultDevision.appendChild(header);

    const paragraph = document.createElement("p");
    const result = assesment(userName);
    paragraph.innerText = result;
    resultDevision.appendChild(paragraph);

    // ツイートエリアの作成
    tweetDivision.innerText = "";

    const anchor = document.createElement("a");
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent("あなたのいいところ"); + "&ref_src=twsrc%5Etfw";

    anchor.setAttribute("href", hrefValue);
    anchor.setAttribute("class", "twitter-hashtag-button");
    anchor.setAttribute("data-text", result);
    anchor.innerText = "Tweet #あなたのいいところ";

    tweetDivision.appendChild(anchor);

    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    tweetDivision.appendChild(script);
  }
);

// Enterキーで診断する処理を追加
userNameInput.addEventListener(
  "keydown",
  (event) => {
    if(event.code === "Enter"){
      assesmentButton.dispatchEvent(new Event("click"));
    }
  }
)

const answers = [
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
  "###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。"
]
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
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  // TODO ###userName### をユーザの名前に置き換える
  result = result.replaceAll("###userName###", userName);
  return result;
}

// テストを行う関数
function test(){
  console.log("診断結果の文章のテスト");

  // 太郎
  console.log("太郎");
  console.assert(
    assesment("太郎") === 
    "太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。",
    "診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。"
  );

    // 次郎
  console.log("次郎");
  console.assert(
    assesment("次郎") === 
    "次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。",
    "診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。"
  );

  console.log("診断結果の文章のテストの終了");

}
test();

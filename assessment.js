"use strict";
const userNameInput= document.getElementById("user-name");
const assessmentButton=document.getElementById("assessment");
const resultDivided=document.getElementById("result-area");
const tweetDivided=document.getElementById("tweet-area");

/**
 * 指定した要素の子要素をすべて削除する
 * @param{HTMLElement}element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }  
}

assessmentButton.onclick=()=>{
    const username = userNameInput.value;
    if(username.length === 0){
        return;
    }
userNameInput.onkeydown=(event)=>{
    if(event.key==="Enter"){
        assessmentButton.onclick();
    }
}

    //診断結果エリアの作成,div-resultarea（=resultDIvidedに代入）を一度削除し、
    //そこに子要素として追加
    removeAllChildren(resultDivided);
    const header=document.createElement("h3");
    header.innerText="診断結果";
    resultDivided.appendChild(header);

    const paragraph=document.createElement("p");
    const result=assessment(username);
    paragraph.innerText=result;
    resultDivided.appendChild(paragraph);

    //ToDo　ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor=document.createElement("a");
    const hrefValue="https://twitter.com/intent/tweet?button_hashtag="
        +encodeURIComponent("おみくじ")
        +"&ref_src=twsrc%5Etfw" 
    
    anchor.setAttribute("href",hrefValue);
    anchor.className="twitter-hashtag-button";
    anchor.setAttribute("data-text",result);
    anchor.innerText="Tweet #おみくじ";
    tweetDivided.appendChild(anchor);
    
    //widgets.js(ツイッターのJavaSctipt)の実行
    const script=document.createElement("script");
    script.setAttribute("src","https://platform.twitter.com/widgets.js");
    tweetDivided.appendChild(script);
    
};

//診断結果の配列
const answers =[
    "{username}の運勢は大吉！何もかもがうまくいきます。やったね！",
    "{username}の運勢は吉。たいていのことはうまくいくけど、お金だけは離れていくよ。節約しよう。",
    "{username}の運勢は吉。金運はいいけど、好きな人に振られちゃうかも。でも、人生ってそんなものだよね。",
    "{username}の運勢は吉。健康運が落ちてます。けがに気を付けてね。",
    "{username}の運勢は凶。仕事で大きな失敗をしちゃうかも。早めに仲間に手助けを頼もう。",
    "{username}の運勢は凶。今新しいことをするのはやめて、次に備えよう。準備期間も大事だよ。"
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}username ユーザーの名前
 * @returns{string}診断結果
 */
function assessment(username){
    /**
     * 診断処理＝文字を数字に変換して足した数を診断結果の種類数で割り、余りを出す。余りで診断結果が決まる。
     * 変数　SumOfCharcode 文字を数字に変換して足す、その数
    */
    let SumOfCharCode=0;
        //i=usernameの何文字目か
    for(let i=0;i<username.length;i++){
        SumOfCharCode=SumOfCharCode+username.charCodeAt(i);
    }

    //index=SumOfCharcodeを診断結果の種類で割った数
    const index=SumOfCharCode%answers.length;
    //result=診断結果
    let result=answers[index];

    result=result.replace(/\{username\}/g,username);

    return result;
}

//テストコード
console.assert(
    assessment("ハリネズミ")===assessment("ハリネズミ"),
    "同じ名前なのに結果が違うよ。"
);

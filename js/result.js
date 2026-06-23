// ============================
// 芸能ステータス診断 Result JS
// ============================

// 回答取得
let answers = {};

for (let i = 1; i <= 6; i++) {

    const data = JSON.parse(localStorage.getItem("question" + i));

    if (data) {

        Object.assign(answers, data);

    }

}

// 平均値
function average(list) {

    let sum = 0;

    list.forEach(function (key) {

        sum += Number(answers[key]);

    });

    return sum / list.length;

}

// 4軸判定

const IorB =
average(["q4","q8","q12","q15","q17","q21"]) >= 3
? "I"
: "B";

const PorS =
average(["q2","q5","q10","q13","q18","q22"]) >= 3
? "P"
: "S";

const CorN =
average(["q1","q7","q11","q16","q19","q23"]) >= 3
? "C"
: "N";

const QorA =
average(["q3","q6","q9","q14","q20","q24"]) >= 3
? "A"
: "Q";

const type = IorB + PorS + CorN + QorA;

// ============================
// 16タイプ
// ============================

const resultData = {

IPCQ:{

title:"静かな天才型",

text:"構成力と分析力で笑いを作るタイプ。伏線回収や緻密なネタが得意。"

},

IPCA:{

title:"主人公型",

text:"勢いと演技力で場を支配するエンターテイナー。"

},

IPNQ:{

title:"観察者型",

text:"自然体の空気感で笑いを生み出すタイプ。"

},

IPNA:{

title:"ムードメーカー型",

text:"瞬発力が高く、平場で最も力を発揮する。"

},

ISCQ:{

title:"理論派型",

text:"センスと構成力を兼ね備えた職人。"

},

ISCA:{

title:"スマートスター型",

text:"洗練された演技で魅せる表現者。"

},

ISNQ:{

title:"ナチュラル職人型",

text:"飾らない雰囲気で独特の笑いを作る。"

},

ISNA:{

title:"万能型",

text:"誰とでも合わせられるオールラウンダー。"

},

BPCQ:{

title:"脚本家型",

text:"考え抜いた構成で勝負するタイプ。"

},

BPCA:{

title:"熱血クリエイター型",

text:"計画性とパワーを兼ね備えた演出家。"

},

BPNQ:{

title:"ストーリーテラー型",

text:"自然な語りで世界観を作る。"

},

BPNA:{

title:"王道型",

text:"バランス感覚が高く安定感抜群。"

},

BSCQ:{

title:"技巧派型",

text:"言葉選びと構成力が光る職人。"

},

BSCA:{

title:"プロデューサー型",

text:"全体を俯瞰しながら笑いを組み立てる。"

},

BSNQ:{

title:"参謀型",

text:"冷静に最適解を選び続けるタイプ。"

},

BSNA:{

title:"オールマイティ型",

text:"状況に応じて柔軟に立ち回れる万能プレイヤー。"

}

};

// ============================
// 表示
// ============================

document.getElementById("typeCode").textContent = type;

document.getElementById("typeName").textContent =
resultData[type].title;

document.getElementById("description").textContent =
resultData[type].text;

// ============================
// シェア
// ============================

function shareResult(){

const text =
"私の芸能ステータス診断は「" +
type +
"（" +
resultData[type].title +
"）」でした！";

const url =
"https://migimimisan.github.io/owarai/";

window.open(

"https://twitter.com/intent/tweet?text=" +

encodeURIComponent(text) +

"&url=" +

encodeURIComponent(url),

"_blank"

);

}

// ============================
// リセット
// ============================

function restart(){

localStorage.clear();

location.href="index.html";

}

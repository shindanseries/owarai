"use strict";

// ============================
// 回答取得（安全版）
// ============================
let answers = {};

for (let i = 1; i <= 6; i++) {
    const raw = localStorage.getItem("question" + i);
    const data = raw ? JSON.parse(raw) : {};
    Object.assign(answers, data);
}

// ============================
// 平均計算（安全版）
// ============================
function average(list) {
    let sum = 0;
    let count = 0;

    for (const key of list) {
        const val = Number(answers[key]);
        if (!isNaN(val)) {
            sum += val;
            count++;
        }
    }

    return count === 0 ? 0 : sum / count;
}

// ============================
// PNIO ⇔ SABC 軸定義
// ============================

// 1軸：P / S
const P_or_S = average(["q2","q5","q10","q13","q18","q22"]) >= 3 ? "P" : "S";

// 2軸：N / A
const N_or_A = average(["q1","q7","q11","q16","q19","q23"]) >= 3 ? "N" : "A";

// 3軸：I / B
const I_or_B = average(["q4","q8","q12","q15","q17","q21"]) >= 3 ? "I" : "B";

// 4軸：O / C
const O_or_C = average(["q3","q6","q9","q14","q20","q24"]) >= 3 ? "O" : "C";

// ============================
// タイプ生成
// ============================
const type = P_or_S + N_or_A + I_or_B + O_or_C;

// ============================
// 結果データ（最低限成立版）
// ============================
const resultData = {

PNIO: {
    title: "直感クリエイター型",
    text: "自由な発想と感覚で笑いを生み出すタイプ。空気を作る側。"
},

PNIC: {
    title: "感性分析型",
    text: "観察力と直感を組み合わせて笑いを設計するタイプ。"
},

PNIO: {
    title: "自由表現型",
    text: "枠にとらわれない発想で場を動かすタイプ。"
},

PNOC: {
    title: "バランス型クリエイター",
    text: "感性と構造を両立する安定型。"
},

SABC: {
    title: "構造分析エリート",
    text: "論理と設計で笑いを組み立てる職人型。"
},

SABO: {
    title: "構成安定型",
    text: "計画性と安定感を持つバランサー。"
},

SNBC: {
    title: "冷静観察型",
    text: "状況判断と分析で最適解を出すタイプ。"
},

SNBO: {
    title: "理論派オールラウンダー",
    text: "構造と柔軟性を両立する万能型。"
}

};

// ============================
// 表示
// ============================
const typeCodeEl = document.getElementById("typeCode");
const typeNameEl = document.getElementById("typeName");
const descEl = document.getElementById("description");

typeCodeEl.textContent = type;

if (resultData[type]) {
    typeNameEl.textContent = resultData[type].title;
    descEl.textContent = resultData[type].text;
} else {
    typeNameEl.textContent = "未定義タイプ";
    descEl.textContent = "タイプ定義が不足しています：" + type;
}

// ============================
// シェア機能
// ============================
function shareResult() {

    const title = resultData[type]?.title || "未定義タイプ";

    const text =
        `私の芸能ステータス診断は「${type}（${title}）」でした！`;

    const url = "https://migimimisan.github.io/owarai/";

    window.open(
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(text) +
        "&url=" +
        encodeURIComponent(url),
        "_blank"
    );
}

// ============================
// デバッグ
// ============================
console.log("RESULT DEBUG:", {
    type,
    P_or_S,
    N_or_A,
    I_or_B,
    O_or_C,
    answers
});

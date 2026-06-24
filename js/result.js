"use strict";

function getAllAnswers() {
    let result = {};
    for (let i = 1; i <= 6; i++) {
        const raw = localStorage.getItem("question" + i);
        if (raw) Object.assign(result, JSON.parse(raw));
    }
    return result;
}

function average(answers, keys) {
    let sum = 0, count = 0;
    for (const k of keys) {
        const v = Number(answers[k]);
        if (!isNaN(v)) { sum += v; count++; }
    }
    return count === 0 ? 0 : sum / count;
}

function calculateType(answers) {
    const PS_P = average(answers, ["q2", "q10", "q22"]);
    const PS_S = average(answers, ["q5", "q13", "q18"]);
    const first = PS_P >= PS_S ? "P" : "S";

    const NA_N = average(answers, ["q11", "q19", "q23"]);
    const NA_A = average(answers, ["q1", "q7", "q16"]);
    const second = NA_A >= NA_N ? "A" : "N";

    const IB_I = average(answers, ["q4", "q17", "q21"]);
    const IB_B = average(answers, ["q8", "q12", "q15"]);
    const third = IB_I >= IB_B ? "I" : "B";

    // O=混沌、C=秩序に修正
    const OC_O = average(answers, ["q6", "q9", "q14"]);  // 混沌系
    const OC_C = average(answers, ["q3", "q20", "q24"]); // 秩序系
    const fourth = OC_C >= OC_O ? "C" : "O";

    return first + second + third + fourth;
}

function calcPercentages(answers) {
    const PS_P = average(answers, ["q2", "q10", "q22"]);
    const PS_S = average(answers, ["q5", "q13", "q18"]);
    const PS_total = PS_P + PS_S;
    const pPct = Math.round((PS_P / PS_total) * 100);
    const sPct = 100 - pPct;

    const NA_A = average(answers, ["q1", "q7", "q16"]);
    const NA_N = average(answers, ["q11", "q19", "q23"]);
    const NA_total = NA_A + NA_N;
    const aPct = Math.round((NA_A / NA_total) * 100);
    const nPct = 100 - aPct;

    const IB_I = average(answers, ["q4", "q17", "q21"]);
    const IB_B = average(answers, ["q8", "q12", "q15"]);
    const IB_total = IB_I + IB_B;
    const iPct = Math.round((IB_I / IB_total) * 100);
    const bPct = 100 - iPct;

    const OC_O = average(answers, ["q6", "q9", "q14"]);
    const OC_C = average(answers, ["q3", "q20", "q24"]);
    const OC_total = OC_O + OC_C;
    const oPct = Math.round((OC_O / OC_total) * 100);
    const cPct = 100 - oPct;

    return { pPct, sPct, aPct, nPct, iPct, bPct, oPct, cPct };
}

function renderBars(pct) {
    const bars = [
        { leftLabel: "パワー(power)", leftPct: pct.pPct, rightLabel: "センス(sense)", rightPct: pct.sPct },
        { leftLabel: "素(natural)",   leftPct: pct.nPct, rightLabel: "演技(act)",      rightPct: pct.aPct },
        { leftLabel: "瞬発(instant)", leftPct: pct.iPct, rightLabel: "構築(building)", rightPct: pct.bPct },
        { leftLabel: "混沌(chaos)",   leftPct: pct.oPct, rightLabel: "秩序(order)",    rightPct: pct.cPct },
    ];

    const container = document.getElementById("axisChart");
    if (!container) return;

    container.innerHTML = bars.map(b => `
        <div style="margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;font-weight:bold;font-size:15px;">
                <span>${b.leftLabel} ${b.leftPct}%</span>
                <span>${b.rightPct}% ${b.rightLabel}</span>
            </div>
            <div style="width:100%;height:18px;background:#e5e5e5;border-radius:999px;overflow:hidden;">
                <div style="width:${b.leftPct}%;height:100%;background:#3d73ff;border-radius:999px;"></div>
            </div>
        </div>
    `).join("");
}

const resultData = {
    PNIO: { title: "なで肩マッチョマン",           text: "空気を読まずに読む天才。勢いと本能で笑いを量産する、現場の太陽。" },
    PNIC: { title: "ボディービル部破り",             text: "筋骨隆々で場を破壊できる能力を秘めているけど、実はそれは綿密な計画によるもの！ボディービルダーのように計画的に筋肉を蓄えるタイプ。" },
    PNBO: { title: "日体大卒総理大臣",               text: "周囲の状況を的確に把握し、ここぞという時に渾身の右ストレート！！一人で空気をガラッと変えることもできるやり手。" },
    PNBC: { title: "カレー味の太陽",                 text: "世界の中心は太陽である君だ！！そしてカレーのようにどこに混ざっても君の個性は消えず君色に染めてしまう！！カレーうどん、カレードリア、カレーパン！！！" },
    PAIO: { title: "バケモノ使い",                   text: "内に秘めたバケモノを次々と使いこなす器用なパワー系マジシャン！！バケモノを暴走させることはめったにない！だって君は手懐けるのが上手だから！" },
    PAIC: { title: "デオキシススピードフォルム",     text: "パワーもスピードもおまかせ！！最短で笑いをお届け！時には違うフォルムにだってなれる！そんな君はまさにデオキシス！！" },
    PABO: { title: "力士カメレオン",                 text: "張り手、うっちゃり、がぶりより、あらゆる戦術すべてを使いこなすテクニシャン！！土俵の上で誰も敵なし！独壇場！！" },
    PABC: { title: "ピエロ爆弾魔",                   text: "爆弾作って、なんでもかんでもぶっ壊す！まさに"自然発生するエネルギー爆発の連続"！！重い場だって打破できる才能を持っている！！" },
    SNIO: { title: "センス瞬発型",                   text: "言葉のセンスと即興力で光る。一言で会場の温度を変える天才肌。" },
    SNIC: { title: "センス安定型",                   text: "言葉のセンスがあって場も読める。安心して任せられるクレバーな笑い職人。" },
    SNBO: { title: "感性設計型",                     text: "独特な感性をじっくり練り上げる。唯一無二の世界観で笑いを生み出すタイプ。" },
    SNBC: { title: "精密センス型",                   text: "センスと構成と秩序が三位一体。緻密に設計された笑いを届ける完成形。" },
    SAIO: { title: "即興アクター型",                 text: "その場でキャラを作り笑いを生む。予測不能な動きで観客を翻弄する自由人。" },
    SAIC: { title: "安定演技型",                     text: "しっかりしたキャラと秩序感で笑わせる。信頼できるクレバーな演者タイプ。" },
    SABO: { title: "世界観アクター型",               text: "キャラと世界観で独自の空気を作る。一度見たら忘れられない個性派。" },
    SABC: { title: "ガリバタ構造分析エリート型",     text: "演技・構成・秩序・センスを全て持つ理想形。完璧に設計された笑いを届ける頂点。" },
};

const answers = getAllAnswers();
const type = calculateType(answers);
const pct = calcPercentages(answers);

document.getElementById("typeCode").textContent = type;

if (resultData[type]) {
    document.getElementById("typeName").textContent = resultData[type].title;
    document.getElementById("description").textContent = resultData[type].text;
} else {
    document.getElementById("typeName").textContent = "未定義タイプ";
    document.getElementById("description").textContent = "タイプ定義が見つかりません：" + type;
}

renderBars(pct);

function shareResult() {
    const title = resultData[type]?.title || type;
    const text = `私のお笑いステータス診断は「${type}（${title}）」でした！`;
    const url = "https://migimimisan.github.io/owarai/";
    window.open(
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(text) + "&url=" + encodeURIComponent(url),
        "_blank"
    );
}

console.log("RESULT DEBUG:", { type, pct, answers });

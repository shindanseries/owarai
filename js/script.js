// ======================
// 芸能ステータス診断 共通JS
// ======================

// 回答保存
function saveAnswers(pageNumber, questionNames) {

    const answers = {};

    for (let name of questionNames) {

        const checked = document.querySelector(
            `input[name="${name}"]:checked`
        );

        if (!checked) {

            alert("すべての質問に回答してください。");

            return false;

        }

        answers[name] = Number(checked.value);

    }

    localStorage.setItem(

        "question" + pageNumber,

        JSON.stringify(answers)

    );

    return true;

}

// 次ページへ
function nextPage(pageNumber, nextFile, questionNames) {

    if (saveAnswers(pageNumber, questionNames)) {

        window.location.href = nextFile;

    }

}

// 進捗バー更新
function setProgress(percent) {

    const bar = document.querySelector(".progress-bar");

    if (bar) {

        bar.style.width = percent + "%";

    }

}

// 回答取得
function getAllAnswers() {

    let result = {};

    for (let i = 1; i <= 6; i++) {

        const data = JSON.parse(

            localStorage.getItem("question" + i)

        );

        if (data) {

            Object.assign(result, data);

        }

    }

    return result;

}

// 平均値計算
function average(answers, list) {

    let sum = 0;

    list.forEach(function (key) {

        sum += Number(answers[key]);

    });

    return sum / list.length;

}

// タイプ判定
function calculateType() {

    const answers = getAllAnswers();

    const IB =
        average(answers, ["q4", "q8", "q12", "q15", "q17", "q21"]);

    const PS =
        average(answers, ["q2", "q5", "q10", "q13", "q18", "q22"]);

    const CN =
        average(answers, ["q1", "q7", "q11", "q16", "q19", "q23"]);

    const QA =
        average(answers, ["q3", "q6", "q9", "q14", "q20", "q24"]);

    const first = IB >= 3 ? "I" : "B";

    const second = PS >= 3 ? "P" : "S";

    const third = CN >= 3 ? "C" : "N";

    const fourth = QA >= 3 ? "A" : "Q";

    return first + second + third + fourth;

}

// シェア
function shareResult(type) {

    const text =
        "私の芸能ステータス診断は『" +
        type +
        "』でした！";

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

// もう一度診断
function resetDiagnosis() {

    localStorage.clear();

    window.location.href = "index.html";

}

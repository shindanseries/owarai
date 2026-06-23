"use strict";

// 回答保存
function saveAnswers(pageNumber, questionNames) {
    const answers = {};
    for (let name of questionNames) {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
            alert("すべての質問に回答してください。");
            return false;
        }
        answers[name] = Number(checked.value);
    }
    localStorage.setItem("question" + pageNumber, JSON.stringify(answers));
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
    if (bar) bar.style.width = percent + "%";
}

// もう一度診断
function resetDiagnosis() {
    localStorage.clear();
    window.location.href = "index.html";
}

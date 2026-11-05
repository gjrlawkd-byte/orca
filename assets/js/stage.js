/* 홈 히어로: 흐린 배경의 명화 퍼즐 앱을 클릭하면 전체 화면으로 실행하고, 닫으면 돌아온다. */
(function () {
  var stage = document.getElementById("stage");
  if (!stage) return;

  var frame = document.getElementById("app-frame");
  function play(on) {
    stage.classList.toggle("playing", on);
    document.body.classList.toggle("is-playing", on);
    frame.tabIndex = on ? 0 : -1;
    frame.parentNode.setAttribute("aria-hidden", String(!on));
    if (on) { try { frame.focus(); } catch (e) { /* 포커스 불가 환경 */ } } else { document.getElementById("stage-play").focus(); }
  }
  document.getElementById("stage-play").addEventListener("click", function () { play(true); });
  document.getElementById("stage-close").addEventListener("click", function () { play(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && stage.classList.contains("playing")) play(false); });
})();

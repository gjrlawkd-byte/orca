/* 공통 레이아웃: 헤더·푸터 주입, 내비 활성화, 모바일 메뉴, 테마 토글, 스크롤 리빌.
   다른 스크립트가 쓰는 도우미는 window.OrcaSite 에 둔다. */
(function () {
  var D = window.ORCA;
  var C = D.cafe;
  var page = document.body.getAttribute("data-page") || "home";

  var NAV = [
    { id: "guide", href: "guide.html", label: "이용안내" },
    { id: "menu", href: "menu.html", label: "메뉴" },
    { id: "puzzles", href: "puzzles.html", label: "퍼즐 컬렉션" },
    { id: "ranking", href: "ranking.html", label: "이달의 퍼즐" },
    { id: "visit", href: "visit.html", label: "오시는 길" }
  ];

  var ORCA_PATH =
    "M6 34C12 21 36 14 60 15.5C77 16.6 92 22 104 30L114 21.5C116 20 118.5 21.5 117.4 24L112 34L117.4 44C118.5 46.5 116 48 114 46.5L104 38C92 46.5 70 51 48 49C29 47.5 12 44 6 34Z";
  var ORCA_FIN = "M50 17L57 1.5C58 -0.5 61 -0.2 61.4 2L65 17Z";
  var ORCA_PEC = "M36 44C35 51 30 56 24 57C28 51 30 47 31 43Z";

  function orcaSVG(cls) {
    // 범고래 실루엣. 몸통은 currentColor, 무늬는 --mat
    return (
      '<svg class="' + (cls || "") + '" viewBox="-2 -2 124 62" aria-hidden="true">' +
      '<path d="' + ORCA_FIN + '" fill="currentColor"/>' +
      '<path d="' + ORCA_PATH + '" fill="currentColor"/>' +
      '<path d="' + ORCA_PEC + '" fill="currentColor"/>' +
      '<path d="M8 36C18 43 33 45.5 47 43C35 48.5 18 46 8 36Z" fill="var(--mat)"/>' +
      '<ellipse cx="25" cy="26.5" rx="7.5" ry="2.8" transform="rotate(-12 25 26.5)" fill="var(--mat)"/>' +
      '<path d="M66 18.5C72 18 78 19.5 82 21.5C76 22.5 70 22 66 18.5Z" fill="var(--mat)" opacity=".55"/>' +
      "</svg>"
    );
  }

  var PIECE_PATH = "M20 20h20a10 10 0 1 1 20 0h20v20a10 10 0 1 1 0 20v20H60a10 10 0 1 0-20 0H20V60a10 10 0 1 0 0-20Z";

  function badgeSVG() {
    return (
      '<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="47" fill="var(--mat)" stroke="currentColor" stroke-width="3"/>' +
      '<circle cx="50" cy="50" r="40.5" fill="none" stroke="currentColor" stroke-width="1"/>' +
      '<g transform="translate(13 30) scale(0.62)" style="color:var(--ink)">' +
      '<path d="' + ORCA_FIN + '" fill="currentColor"/><path d="' + ORCA_PATH + '" fill="currentColor"/>' +
      '<path d="' + ORCA_PEC + '" fill="currentColor"/>' +
      '<ellipse cx="25" cy="26.5" rx="7.5" ry="2.8" transform="rotate(-12 25 26.5)" fill="var(--mat)"/>' +
      '<path d="M8 36C18 43 33 45.5 47 43C35 48.5 18 46 8 36Z" fill="var(--mat)"/></g>' +
      '<g transform="translate(58 56) scale(0.26)"><path d="' + PIECE_PATH + '" fill="var(--ocean)"/></g>' +
      "</svg>"
    );
  }

  var ICON = {
    sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };

  /* ── 영업 상태 (서울 시간 기준) ─────────────────────────── */
  function seoulNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: days[o.weekday], min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }
  function toMin(t) { var a = t.split(":"); return +a[0] * 60 + +a[1]; }
  function hoursFor(day) { return C.hours.filter(function (h) { return h.d === day; })[0]; }

  function status() {
    var now = seoulNow();
    var h = hoursFor(now.day);
    if (h.closed) {
      return { state: "closed", text: "오늘은 정기 휴무", sub: "화요일 " + hoursFor(2).open + "에 다시 열어요" };
    }
    var o = toMin(h.open), c = toMin(h.close);
    if (now.min < o) return { state: "soon", text: "오늘 " + h.open + " 오픈", sub: h.close + "까지 영업" };
    if (now.min < c) return { state: "open", text: "지금 영업 중", sub: h.close + "까지 · 라스트오더 " + C.lastOrder };
    var next = hoursFor((now.day + 1) % 7);
    return { state: "closed", text: "오늘 영업 종료", sub: next.closed ? "내일은 정기 휴무예요" : "내일 " + next.open + " 오픈" };
  }

  function won(n) { return n.toLocaleString("ko-KR"); }

  window.OrcaSite = { orcaSVG: orcaSVG, PIECE_PATH: PIECE_PATH, status: status, seoulNow: seoulNow, won: won };

  /* ── 헤더 ─────────────────────────────────────────────── */
  var header = document.getElementById("site-header");
  if (header) {
    header.outerHTML =
      '<a class="skip" href="#main">본문으로 건너뛰기</a>' +
      '<header class="site-header"><div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="퍼즐카페 오르카 홈">' + badgeSVG() +
      '<span class="brand-word"><b>Orca</b><small>Puzzle Cafe · Songdo</small></span></a>' +
      '<nav class="nav" id="site-nav" aria-label="주요 메뉴">' +
      NAV.map(function (n) {
        return '<a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") + ">" + n.label + "</a>";
      }).join("") +
      '<a class="nav-game" href="' + D.gameUrl + '" target="_blank" rel="noopener">명화 퍼즐 게임 <span class="arr ext" aria-hidden="true"></span></a>' +
      "</nav>" +
      '<a class="btn nav-cta" href="' + D.gameUrl + '" target="_blank" rel="noopener">명화 퍼즐 게임 <span class="arr ext" aria-hidden="true"></span></a>' +
      '<button class="icon-btn theme-btn" type="button" id="theme-btn" aria-label="밝은 테마와 어두운 테마 전환">' + ICON.sun + ICON.moon + "</button>" +
      '<button class="icon-btn menu-btn" type="button" id="menu-btn" aria-expanded="false" aria-controls="site-nav" aria-label="메뉴 열기">' + ICON.menu + "</button>" +
      "</div></header>";
  }

  var nav = document.getElementById("site-nav");
  var menuBtn = document.getElementById("menu-btn");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    menuBtn.innerHTML = open ? ICON.close : ICON.menu;
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  }

  /* ── 테마 토글 ────────────────────────────────────────── */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-btn");
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("orca-theme", next); } catch (e) { /* 저장소를 쓸 수 없는 환경 */ }
    });
  }

  /* ── 푸터 ─────────────────────────────────────────────── */
  var footer = document.getElementById("site-footer");
  if (footer) {
    var open = C.hours.filter(function (h) { return !h.closed; });
    footer.outerHTML =
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="foot-top">' +
      '<div><div class="foot-word">Orca</div><p class="foot-col" style="margin-top:20px;max-width:22rem">한 조각씩 천천히 맞춰 가는 송도의 퍼즐카페.</p></div>' +
      '<div class="foot-col"><h4>Visit</h4><span>' + C.address + "</span><span>" + C.addressDetail + "</span><span>" + C.parking + "</span></div>" +
      '<div class="foot-col"><h4>Hours</h4><span>' + open[0].label + "–" + open[open.length - 1].label + " " + open[0].open + "–" + open[0].close + "</span>" +
      "<span>라스트오더 " + C.lastOrder + "</span><span>월요일 정기 휴무</span>" +
      '<span class="mono num">' + C.phone + "</span></div>" +
      '<div class="foot-col"><h4>Follow</h4>' +
      C.instagram.map(function (i) { return '<a href="' + i.url + '" target="_blank" rel="noopener">' + i.handle + "</a>"; }).join("") +
      "</div></div>" +
      '<div class="foot-bottom"><span>© 2026 ' + C.nameEn + "</span><span>" + C.name + " · " + C.address + " · " + C.phone + "</span></div>" +
      "</div></footer>";
  }

  /* ── 스크롤 리빌: 첫 화면 아래에 있는 요소만 대기시킨다 ── */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove("pending"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    window.OrcaSite.reveal = function (scope) {
      (scope || document).querySelectorAll(".reveal").forEach(function (el) {
        if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add("pending"); io.observe(el); }
      });
    };
  } else {
    window.OrcaSite.reveal = function () {};
  }
  /* ── 마우스를 따라다니는 작은 범고래 (마우스가 있는 기기에서만) ── */
  // 기본 입력이 터치인 노트북도 있으므로 기기 조건 대신 실제 마우스 움직임으로 판단한다.
  // 동작 줄이기 설정에서는 헤엄 흔들림만 끄고 따라다니기는 유지한다.
  {
    var buddy = document.createElement("div");
    buddy.className = "orca-buddy" + (reduce ? " still" : "");
    buddy.setAttribute("aria-hidden", "true");
    buddy.innerHTML = orcaSVG();
    document.body.appendChild(buddy);
    var tx = 0, ty = 0, bx = 0, by = 0, angle = 0, flip = 1, started = false;
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      tx = e.clientX; ty = e.clientY;
      if (!started) {
        bx = tx; by = ty; started = true;
        buddy.style.transform = "translate(" + (bx + 26) + "px," + (by + 22) + "px)";
        requestAnimationFrame(follow);
      }
      buddy.classList.add("on");
    });
    document.documentElement.addEventListener("mouseleave", function () { buddy.classList.remove("on"); });
    function follow() {
      var dx = tx - bx, dy = ty - by, dist = Math.sqrt(dx * dx + dy * dy);
      bx += dx * 0.1; by += dy * 0.1;
      // 그림의 머리는 왼쪽: 오른쪽으로 움직이면 좌우를 뒤집고, 오르내림에 맞춰 머리를 기울인다
      if (dist > 3) flip = dx > 0 ? -1 : 1;
      var tilt = dist > 3 ? Math.max(-0.6, Math.min(0.6, Math.atan2(dy, Math.abs(dx)))) : 0;
      angle += ((flip === 1 ? -tilt : tilt) - angle) * 0.12;
      buddy.style.transform = "translate(" + (bx + 26) + "px," + (by + 22) + "px) rotate(" + angle.toFixed(3) + "rad) scaleX(" + flip + ")";
      requestAnimationFrame(follow);
    }
  }
})();

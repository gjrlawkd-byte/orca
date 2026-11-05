/* 페이지별 렌더링. [data-render="이름"] 요소를 찾아 RENDER[이름] 으로 채운다. */
(function () {
  var D = window.ORCA;
  var C = D.cafe;
  var S = window.OrcaSite;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function secs(t) { var a = t.split(":"); return +a[0] * 60 + +a[1]; }
  function ranked() {
    return D.ranking.entries.slice().sort(function (a, b) { return secs(a.time) - secs(b.time); });
  }
  function level(p) { return p <= 150 ? 1 : p <= 500 ? 2 : p <= 1000 ? 3 : 4; }
  function difficulty(p) {
    var n = level(p), html = "";
    for (var i = 0; i < 5; i++) html += "<i" + (i < n ? ' class="on"' : "") + "></i>";
    return '<span class="diff" role="img" aria-label="난이도 ' + n + ' / 5">' + html + "</span>";
  }

  /* 퍼즐 표지: 실제 사진 대신 테마별 추상 구성 (사진 확보 후 <img>로 교체) */
  function coverStyle(p) {
    var a = p.tone[0], b = p.tone[1], c = p.tone[2];
    switch (p.theme) {
      case "명화":
        return "radial-gradient(70% 60% at 32% 28%," + b + " 0 16%,transparent 52%),radial-gradient(50% 50% at 74% 72%," + c + " 0 20%,transparent 62%),linear-gradient(160deg," + a + "," + c + ")";
      case "풍경":
        return "radial-gradient(circle at 72% 30%," + c + " 0 9%,transparent 9.5%),linear-gradient(180deg," + c + " 0 8%,transparent 8%),repeating-linear-gradient(90deg," + b + " 0 7%,transparent 7% 9%,"+ b +" 9% 13%,transparent 13% 15%) 0 100%/100% 46% no-repeat,linear-gradient(180deg," + a + " 0 54%," + b + " 54%)";
      case "캐릭터":
        return "radial-gradient(circle," + b + " 0 20%,transparent 21%) 0 0/34% 45%,radial-gradient(circle," + c + " 0 12%,transparent 13%) 17% 22%/34% 45%," + a;
      case "아트":
        return "conic-gradient(" + a + " 25%," + b + " 0 50%," + a + " 0 75%," + b + " 0) 0 0/25% 33.34%";
      default:
        return "radial-gradient(circle at 70% 34%," + b + " 0 15%,transparent 15.5%),radial-gradient(circle at 26% 76%," + c + " 0 26%,transparent 26.5%),linear-gradient(135deg," + a + "," + a + ")";
    }
  }
  function framedPuzzle(p, extraClass) {
    return (
      '<div class="frame"><div class="mat"><div class="frame-art ' + (extraClass || "") + '">' +
      '<div class="puzzle-art" style="background:' + coverStyle(p) + '"></div>' +
      '</div></div></div>' +
      '<figcaption class="label"><b>' + esc(p.title) + "</b>" +
      "<span>Jigsaw puzzle · " + p.pieces.toLocaleString("ko-KR") + " pcs · " + esc(p.theme) + "</span>" +
      '<span>' + difficulty(p.pieces) + " " +
      '<span class="tag' + (p.status === "체험" ? " accent" : "") + '">' + (p.status === "체험" ? "체험 가능" : "구매 후 이용") + "</span></span>" +
      "</figcaption>"
    );
  }


  /* 명화(CC0) 이미지 한 점: 액자 없이 이미지와 작품 캡션 */
  function artById(id) { return D.art.filter(function (a) { return a.id === +id; })[0]; }
  function artFigure(a, cls) {
    return "<figure class=\"art " + (cls || "") + "\">" +
      "<img src=\"assets/img/art/" + a.id + ".jpg\" alt=\"" + esc(a.artist + ", 「" + a.title + "」") + "\" loading=\"lazy\" decoding=\"async\" width=\"600\" height=\"450\">" +
      "<figcaption class=\"label\"><b>" + esc(a.title) + "</b><span>" + esc(a.artist) + " · " + esc(a.date) + "</span></figcaption></figure>";
  }

  var RENDER = {

    status: function (el) {
      var st = S.status();
      el.innerHTML =
        '<div><dt>Today</dt><dd><span class="dot ' + (st.state === "open" ? "open" : st.state === "closed" ? "closed" : "") + '"></span>' + st.text + '</dd><span class="muted" style="font-size:var(--fs-sm)">' + st.sub + "</span></div>" +
        '<div><dt>Puzzle fee</dt><dd class="num">' + S.won(C.puzzleFee) + '원</dd><span class="muted" style="font-size:var(--fs-sm)">' + C.trialPieces + "피스 · 시간 제한 없음</span></div>" +
        '<div><dt>Parking</dt><dd>2시간 무료</dd><span class="muted" style="font-size:var(--fs-sm)">건물 지하주차장</span></div>';
    },

    howto: function (el) {
      el.innerHTML = D.howto.map(function (h) {
        return "<li><h3>" + esc(h.title) + "</h3><p>" + esc(h.body) + "</p></li>";
      }).join("");
    },

    wall: function (el) {
      el.innerHTML = [[436535, "w-a"], [437881, "w-b"], [438817, "w-c"]].map(function (p) { return artFigure(artById(p[0]), p[1] + " reveal"); }).join("");
    },

    "art-img": function (el) {
      el.outerHTML = artFigure(artById(el.getAttribute("data-id")), "solo");
    },

    "art-grid": function (el) {
      el.innerHTML = [435809, 437430, 437658, 436947, 437299, 436819, 437853, 438821].map(function (id) {
        return "<a class=\"art-link\" href=\"" + D.gameUrl + "\" target=\"_blank\" rel=\"noopener\">" + artFigure(artById(id)) + "</a>";
      }).join("");
    },

    "game-link": function (el) {
      el.setAttribute("href", D.gameUrl);
    },

    top3: function (el) {
      var r = ranked().slice(0, 3);
      var order = [1, 0, 2];
      el.innerHTML = order.map(function (i) {
        var e = r[i] || { time: "--:--", team: "도전자를 기다려요" };
        return '<div class="p' + (i + 1) + '"><span class="rk">' + (i + 1) + '<span class="mono" style="font-size:var(--fs-xs);margin-left:4px">위</span></span>' +
          '<span class="tm">' + e.time + '</span><span class="team">' + esc(e.team) + '</span>' +
          '<span class="muted mono" style="font-size:var(--fs-xs)">상품권 ' + S.won(D.ranking.prizes[i]) + "원</span></div>";
      }).join("");
    },

    faq: function (el) {
      el.innerHTML = D.faq.map(function (f, i) {
        return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>";
      }).join("");
    },

    menu: function (el) {
      var tabs = '<div class="tabs" role="tablist" aria-label="메뉴 분류">' + D.menu.map(function (m, i) {
        return '<button class="tab" type="button" role="tab" id="tab-' + m.id + '" aria-controls="menu-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-cat="' + m.id + '">' + m.label + "</button>";
      }).join("") + "</div>";
      el.innerHTML = tabs + '<div id="menu-panel" role="tabpanel"><ul class="menu-board"></ul></div>';
      var list = el.querySelector(".menu-board");
      var panel = el.querySelector("#menu-panel");
      var buttons = el.querySelectorAll(".tab");
      function show(id) {
        var cat = D.menu.filter(function (m) { return m.id === id; })[0];
        buttons.forEach(function (b) {
          var on = b.getAttribute("data-cat") === id;
          b.setAttribute("aria-selected", String(on));
          b.tabIndex = on ? 0 : -1;
        });
        panel.setAttribute("aria-labelledby", "tab-" + id);
        list.innerHTML = cat.items.map(function (it) {
          return '<li><span class="nm"><b>' + esc(it.name) + "</b><i>" + esc(it.en) + '</i></span><span class="lead" aria-hidden="true"></span>' +
            '<span class="pr">' + (it.price ? S.won(it.price) : esc(it.note)) + "</span></li>";
        }).join("");
      }
      buttons.forEach(function (b, i) {
        b.addEventListener("click", function () { show(b.getAttribute("data-cat")); });
        b.addEventListener("keydown", function (e) {
          var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (!k) return;
          var n = buttons[(i + k + buttons.length) % buttons.length];
          n.focus(); show(n.getAttribute("data-cat"));
        });
      });
      show(D.menu[0].id);
    },

    catalog: function (el) {
      var sizes = [
        { id: "all", label: "전체", test: function () { return true; } },
        { id: "150", label: "150피스 · 체험", test: function (p) { return p.pieces <= 150; } },
        { id: "500", label: "500피스", test: function (p) { return p.pieces > 150 && p.pieces <= 500; } },
        { id: "1000", label: "1,000피스", test: function (p) { return p.pieces > 500 && p.pieces <= 1000; } },
        { id: "2000", label: "2,000피스 이상", test: function (p) { return p.pieces > 1000; } }
      ];
      var themes = ["전체"].concat(D.puzzles.map(function (p) { return p.theme; }).filter(function (t, i, a) { return a.indexOf(t) === i; }));
      var state = { size: "all", theme: "전체" };

      el.innerHTML =
        '<div class="filters">' +
        '<div class="filter-row" role="group" aria-label="피스 수"><span class="mono">Pieces</span>' +
        sizes.map(function (s) { return '<button class="chip" type="button" data-size="' + s.id + '" aria-pressed="' + (s.id === "all") + '">' + s.label + "</button>"; }).join("") + "</div>" +
        '<div class="filter-row" role="group" aria-label="테마"><span class="mono">Theme</span>' +
        themes.map(function (t) { return '<button class="chip" type="button" data-theme-filter="' + t + '" aria-pressed="' + (t === "전체") + '">' + t + "</button>"; }).join("") + "</div>" +
        '<p class="muted mono" style="font-size:var(--fs-xs)" aria-live="polite" id="cat-count"></p></div>' +
        '<div class="catalog" id="catalog-grid"></div>';

      var grid = el.querySelector("#catalog-grid");
      var count = el.querySelector("#cat-count");
      function draw() {
        var sz = sizes.filter(function (s) { return s.id === state.size; })[0];
        var items = D.puzzles.filter(function (p) { return sz.test(p) && (state.theme === "전체" || p.theme === state.theme); });
        count.textContent = "전체 " + D.puzzles.length + "점 중 " + items.length + "점";
        grid.innerHTML = items.length
          ? items.map(function (p) { return "<figure>" + framedPuzzle(p) + "</figure>"; }).join("")
          : '<p class="empty">조건에 맞는 퍼즐이 없어요. 다른 피스 수나 테마를 골라 보세요.</p>';
      }
      el.addEventListener("click", function (e) {
        var b = e.target.closest(".chip");
        if (!b) return;
        var group = b.hasAttribute("data-size") ? "data-size" : "data-theme-filter";
        el.querySelectorAll("[" + group + "]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        if (group === "data-size") state.size = b.getAttribute("data-size"); else state.theme = b.getAttribute("data-theme-filter");
        draw();
      });
      draw();
    },

    "rank-month": function (el) {
      // 서울 기준 이번 달을 자동으로 표시한다
      el.textContent = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "long" }).format(new Date());
    },

    "rank-rules": function (el) {
      el.innerHTML = D.ranking.rules.map(function (r, i) { return "<li><span>0" + (i + 1) + "</span>" + esc(r) + "</li>"; }).join("");
    },

    board: function (el) {
      var practice = null;
      function draw() {
        var rows = ranked().map(function (e) { return { team: e.team, time: e.time, date: e.date }; });
        if (practice) rows.push(practice);
        rows.sort(function (a, b) { return secs(a.time) - secs(b.time); });
        el.innerHTML =
          '<table class="board"><thead><tr><th scope="col">순위</th><th scope="col">팀</th><th scope="col">기록</th><th scope="col">날짜</th></tr></thead><tbody>' +
          rows.map(function (r, i) {
            return '<tr class="' + (r.you ? "you" : "") + '"><td class="num">' + (i + 1) + "</td><td>" + esc(r.team) + '</td><td class="t">' + r.time + '</td><td class="muted num">' + r.date + "</td></tr>";
          }).join("") +
          (rows.length ? "" : '<tr><td colspan="4" class="muted">이번 달 첫 기록의 주인공이 되어 보세요. 평일 카운터에서 도전할 수 있어요.</td></tr>') +
          "</tbody></table>";
      }
      draw();
      el.setPractice = function (sec) {
        if (sec == null) { practice = null; draw(); return null; }
        var t = String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(Math.floor(sec % 60)).padStart(2, "0");
        practice = { team: "우리 팀 (연습)", time: t, date: "지금", you: true };
        draw();
        return ranked().filter(function (e) { return secs(e.time) < Math.floor(sec); }).length + 1;
      };
    },

    stopwatch: function (el) {
      el.innerHTML =
        
        '<div class="clock" id="sw-clock" aria-live="off">00:00.0</div>' +
        '<div class="actions"><button class="btn" type="button" id="sw-start">시작</button><button class="btn ghost" type="button" id="sw-reset">초기화</button></div>' +
        '<p class="verdict" id="sw-verdict" aria-live="polite">집에서 150피스로 연습해 보세요. 멈추면 이번 달 순위표에서 몇 위인지 보여 드려요.</p>';
      var clock = el.querySelector("#sw-clock"), startB = el.querySelector("#sw-start"), resetB = el.querySelector("#sw-reset"), verdict = el.querySelector("#sw-verdict");
      var board = document.querySelector('[data-render="board"]');
      var t0 = 0, acc = 0, raf = 0, running = false;
      function fmt(ms) {
        var s = ms / 1000;
        return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(Math.floor(s % 60)).padStart(2, "0") + "." + Math.floor((ms % 1000) / 100);
      }
      function tick() { clock.textContent = fmt(acc + (performance.now() - t0)); raf = requestAnimationFrame(tick); }
      startB.addEventListener("click", function () {
        if (!running) {
          running = true; t0 = performance.now(); tick(); startB.textContent = "완성! 멈추기";
          verdict.textContent = "맞추는 중이에요…";
        } else {
          running = false; cancelAnimationFrame(raf); acc += performance.now() - t0; clock.textContent = fmt(acc);
          startB.textContent = "이어서 재기";
          var place = board && board.setPractice ? board.setPractice(acc / 1000) : null;
          verdict.textContent = place ? "이 기록이면 이번 달 " + place + "위예요. 순위표에 강조해 두었어요. (연습 기록은 저장되지 않아요)" : "";
        }
      });
      resetB.addEventListener("click", function () {
        running = false; cancelAnimationFrame(raf); acc = 0; clock.textContent = "00:00.0"; startB.textContent = "시작";
        verdict.textContent = "다시 준비됐어요. 시작을 누르세요.";
        if (board && board.setPractice) board.setPractice(null);
      });
    },

    hours: function (el) {
      var today = S.seoulNow().day;
      el.innerHTML = "<table class=\"hours\"><tbody>" + C.hours.map(function (h) {
        var cls = (h.d === today ? "today " : "") + (h.closed ? "off" : "");
        return '<tr class="' + cls + '"><td>' + h.label + "요일" + (h.d === today ? " · 오늘" : "") + "</td><td>" + (h.closed ? "정기 휴무" : h.open + " – " + h.close) + "</td></tr>";
      }).join("") + "</tbody></table>";
    },

    "today-status": function (el) {
      var st = S.status();
      el.innerHTML = '<span class="dot ' + (st.state === "open" ? "open" : st.state === "closed" ? "closed" : "") + '"></span><b>' + st.text + '</b> <span class="muted">· ' + st.sub + "</span>";
    },

    maps: function (el) {
      el.innerHTML = C.maps.map(function (m) {
        return '<a class="btn ghost" href="' + m.url + '" target="_blank" rel="noopener">' + m.name + ' <span class="arr ext" aria-hidden="true"></span></a>';
      }).join("");
    },

    insta: function (el) {
      el.innerHTML = C.instagram.map(function (i) {
        return '<a href="' + i.url + '" target="_blank" rel="noopener">' + i.handle + "</a>";
      }).join(" · ");
    },

    text: function (el) {
      // data-key="cafe.phone" 같은 경로의 값을 그대로 넣는다
      var v = el.getAttribute("data-key").split(".").reduce(function (o, k) { return o && o[k]; }, D);
      if (v != null) el.textContent = typeof v === "number" ? v.toLocaleString("ko-KR") : v;
    }
  };

  document.querySelectorAll("[data-render]").forEach(function (el) {
    var fn = RENDER[el.getAttribute("data-render")];
    if (fn) fn(el);
  });

  /* 복사 버튼: 클릭 안에서 clipboard 를 호출하고, 실패하면 텍스트를 선택해 둔다 */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    var target = document.getElementById(b.getAttribute("data-copy"));
    var text = target ? target.textContent.trim() : "";
    function selectIt() {
      var range = document.createRange(); range.selectNodeContents(target);
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      b.textContent = "선택됨 · Ctrl+C로 복사";
    }
    try {
      navigator.clipboard.writeText(text).then(function () { b.textContent = "복사됨"; }, selectIt);
    } catch (err) { selectIt(); }
  });

  S.reveal();
})();

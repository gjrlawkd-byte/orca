/* 퍼즐카페 오르카 — 사이트 전체가 읽는 단일 데이터 소스.
   verify 문구가 있는 값은 출처마다 달라 매장 확인이 필요한 항목이다.
   example: true 인 목록은 프로토타입용 예시 데이터다. */
window.ORCA = {
  cafe: {
    name: "퍼즐카페 오르카",
    nameEn: "Puzzle Cafe Orca",
    address: "인천 연수구 컨벤시아대로42번길 12",
    addressDetail: "송도 코오롱 더 프라우 2단지 202동 1층",
    unitVerify: "호수 확인 필요 (카카오맵 102호 · 공공데이터 109호)",
    phone: "032-710-6370",
    parking: "건물 지하주차장 2시간 무료",
    facilities: ["단체석", "테라스", "2층 퍼즐 갤러리"],
    // d: 0 = 일요일
    hours: [
      { d: 2, label: "화", open: "11:00", close: "23:00" },
      { d: 3, label: "수", open: "11:00", close: "23:00" },
      { d: 4, label: "목", open: "11:00", close: "23:00" },
      { d: 5, label: "금", open: "11:00", close: "23:00" },
      { d: 6, label: "토", open: "11:00", close: "23:00" },
      { d: 0, label: "일", open: "11:00", close: "23:00" },
      { d: 1, label: "월", closed: true }
    ],
    lastOrder: "22:30",
    hoursVerify: "카카오맵 기준. 다른 출처에는 12:00–22:00으로 표기되어 있어 확인이 필요합니다.",
    instagram: [
      { handle: "@cafe__orca", url: "https://www.instagram.com/cafe__orca/" },
      { handle: "@puzzleagenda", url: "https://www.instagram.com/puzzleagenda/" }
    ],
    maps: [
      { name: "카카오맵", url: "https://place.map.kakao.com/878287436" },
      { name: "네이버 지도", url: "https://map.naver.com/p/search/%ED%8D%BC%EC%A6%90%EC%B9%B4%ED%8E%98%20%EC%98%A4%EB%A5%B4%EC%B9%B4" },
      { name: "Google 지도", url: "https://www.google.co.kr/maps/place/%ED%8D%BC%EC%A6%90%EC%B9%B4%ED%8E%98+Orca/data=!4m4!3m3!1s0x357b77d30cf12635:0x8c02862493381389!16s%2Fg%2F11vwzpwzp9" }
    ],
    bigPuzzle: 32000,
    trialPieces: 150,
    puzzleFee: 4000
  },

  menu: [
    {
      id: "coffee", label: "커피",
      items: [
        { name: "아메리카노", en: "Americano", price: 4500 },
        { name: "카페라떼", en: "Caffè Latte", price: 5000 },
        { name: "바닐라라떼", en: "Vanilla Latte", price: 5500 },
        { name: "헤이즐넛라떼", en: "Hazelnut Latte", price: 5500 },
        { name: "카페모카", en: "Caffè Mocha", price: 5500 },
        { name: "카라멜마끼아또", en: "Caramel Macchiato", price: 5500 }
      ]
    },
    {
      id: "noncoffee", label: "논커피",
      items: [
        { name: "초코라떼", en: "Chocolate Latte", price: 5000 },
        { name: "말차라떼", en: "Matcha Latte", price: 5500 },
        { name: "딸기라떼", en: "Strawberry Latte", price: 5500 },
        { name: "얼그레이밀크티", en: "Earl Grey Milk Tea", price: 5500 }
      ]
    },
    {
      id: "juice", label: "주스",
      items: [
        { name: "노아 크러쉬드 애플주스", en: "Fresh Crushed Apple", price: 6000 },
        { name: "노아 발렌시아 오렌지주스", en: "Valencia Orange", price: 6000 }
      ]
    },
    {
      id: "puzzle", label: "퍼즐",
      items: [
        { name: "퍼즐 이용료", en: "150 pcs · 시간 제한 없음", price: 4000 },
        { name: "대형 퍼즐 구매", en: "150 pcs 초과 · 매장 보관 가능", price: null, note: "매장 문의" }
      ]
    }
  ],

  howto: [
    { title: "음료를 주문하세요", body: "음료만 마시고 쉬어 가도 괜찮습니다. 음료는 캔과 컵 중에서 고를 수 있어요." },
    { title: "퍼즐을 고르세요", body: "이용료 4,000원을 더하면 150피스 퍼즐 중 마음에 드는 것을 골라 맞출 수 있습니다." },
    { title: "시간 제한 없이 맞추세요", body: "150피스보다 큰 퍼즐은 구매 후 매장에 보관해 두고 다음 방문에 이어 맞출 수 있어요." }
  ],

  faq: [
    { q: "퍼즐을 하지 않고 음료만 마셔도 되나요?", a: "네. 음료만 주문하고 편하게 쉬어 가셔도 됩니다." },
    { q: "퍼즐 이용 시간에 제한이 있나요?", a: "없습니다. 이용료 4,000원으로 150피스 퍼즐 하나를 시간 제한 없이 맞출 수 있어요." },
    { q: "150피스보다 큰 퍼즐도 해볼 수 있나요?", a: "150피스를 넘는 퍼즐은 구매 후 이용합니다. 다 못 맞추면 매장에 보관했다가 다음에 이어서 하실 수 있어요." },
    { q: "이달의 퍼즐 랭킹은 어떻게 참여하나요?", a: "평일에 카운터에서 '이달의 퍼즐'을 요청하세요. 직원이 시작과 완성 시간을 기록해 랭킹 보드에 올려 드립니다." },
    { q: "주차가 되나요?", a: "건물 지하주차장을 2시간 무료로 이용할 수 있습니다." },
    { q: "단체로 방문해도 되나요?", a: "단체석이 있습니다. 인원이 많다면 방문 전에 전화로 문의해 주세요." }
  ],

    puzzles: [
    { title: "알라딘", pieces: 150, theme: "애니메이션", status: "체험", tone: ["#2C3E8F", "#E7B33E", "#7A3FA0"] },
    { title: "겨울왕국 Ⅱ", pieces: 150, theme: "애니메이션", status: "체험", tone: ["#9CC3E6", "#2F5D8C", "#F2F4F7"] },
    { title: "유미의 세포들", pieces: 150, theme: "캐릭터", status: "체험", tone: ["#F2D24B", "#7CC0E8", "#F08A8A"] },
    { title: "스파이 패밀리", pieces: 150, theme: "캐릭터", status: "체험", tone: ["#E85A8C", "#2E2E3A", "#F5E6C8"] },
    { title: "진주 귀걸이를 한 소녀", pieces: 500, theme: "명화", status: "판매", tone: ["#1B2433", "#C9A45C", "#3A5C8F"] },
    { title: "슬램덩크 엔딩", pieces: 500, theme: "애니메이션", status: "판매", tone: ["#D9473B", "#F2F0E6", "#2B5BA8"] },
    { title: "모나리자", pieces: 1000, theme: "명화", status: "판매", tone: ["#4B4A2E", "#8C7B4F", "#1F2A22"] },
    { title: "별이 빛나는 밤", pieces: 1000, theme: "명화", status: "판매", tone: ["#1D3B7A", "#E8C547", "#2C6FB0"] },
    { title: "비 오는 파리 거리", pieces: 1000, theme: "풍경", status: "판매", tone: ["#6E7A80", "#B9AFA2", "#3F4A52"] },
    { title: "착시 큐브", pieces: 1000, theme: "아트", status: "판매", tone: ["#111111", "#F2F2F2", "#888888"] },
    { title: "뉴욕 스카이라인", pieces: 2000, theme: "풍경", status: "판매", tone: ["#C8A25A", "#3A3328", "#E6D3A3"] },
    { title: "그레이트 웨이브", pieces: 2000, theme: "명화", status: "판매", tone: ["#20406B", "#E9E1CC", "#7E9AB5"] }
  ],

    ranking: {
    month: "2026-10",
    puzzle: { title: "범고래의 저녁", pieces: 150 },
    prizes: [30000, 20000, 10000],
    rules: [
      "평일에만 참여할 수 있어요.",
      "모든 팀이 같은 '이달의 퍼즐'로 기록을 잽니다.",
      "기록은 직원이 시작과 완성을 확인한 시간으로 남깁니다.",
      "월말 기준 1·2·3등에게 매장 상품권을 드려요."
    ],
    entries: [] // 매장 랭킹 보드 기록을 { team, time: "MM:SS", date: "MM.DD" } 형식으로 추가
  }
};

/* 명화 이미지: 메트로폴리탄 미술관 Open Access(CC0, 퍼블릭 도메인). 명화 퍼즐 게임과 같은 작품. */
window.ORCA.gameUrl = "https://gjrlawkd-byte.github.io/art-puzzle/?new";
window.ORCA.art = [
  {
    "id": 45434,
    "title": "가나가와 해변의 높은 파도 아래",
    "titleEn": "Under the Wave off Kanagawa",
    "artist": "가쓰시카 호쿠사이",
    "date": "ca. 1830–32",
    "source": "https://www.metmuseum.org/art/collection/search/45434"
  },
  {
    "id": 437854,
    "title": "고래잡이",
    "titleEn": "Whalers",
    "artist": "윌리엄 터너",
    "date": "ca. 1845",
    "source": "https://www.metmuseum.org/art/collection/search/437854"
  },
  {
    "id": 436535,
    "title": "사이프러스가 있는 밀밭",
    "titleEn": "Wheat Field with Cypresses",
    "artist": "빈센트 반 고흐",
    "date": "1889",
    "source": "https://www.metmuseum.org/art/collection/search/436535"
  },
  {
    "id": 437881,
    "title": "물 주전자를 든 젊은 여인",
    "titleEn": "Young Woman with a Water Pitcher",
    "artist": "요하네스 페르메이르",
    "date": "ca. 1662",
    "source": "https://www.metmuseum.org/art/collection/search/437881"
  },
  {
    "id": 438817,
    "title": "무용 수업",
    "titleEn": "The Dance Class",
    "artist": "에드가르 드가",
    "date": "1874",
    "source": "https://www.metmuseum.org/art/collection/search/438817"
  },
  {
    "id": 436528,
    "title": "붓꽃",
    "titleEn": "Irises",
    "artist": "빈센트 반 고흐",
    "date": "1890",
    "source": "https://www.metmuseum.org/art/collection/search/436528"
  },
  {
    "id": 435809,
    "title": "추수하는 사람들",
    "titleEn": "The Harvesters",
    "artist": "피터르 브뤼헐",
    "date": "1565",
    "source": "https://www.metmuseum.org/art/collection/search/435809"
  },
  {
    "id": 437430,
    "title": "해변에서",
    "titleEn": "By the Seashore",
    "artist": "오귀스트 르누아르",
    "date": "1883",
    "source": "https://www.metmuseum.org/art/collection/search/437430"
  },
  {
    "id": 437658,
    "title": "「그랑드자트섬의 일요일 오후」 습작",
    "titleEn": "Study for \"A Sunday on La Grande Jatte\"",
    "artist": "조르주 쇠라",
    "date": "1884",
    "source": "https://www.metmuseum.org/art/collection/search/437658"
  },
  {
    "id": 436947,
    "title": "뱃놀이",
    "titleEn": "Boating",
    "artist": "에두아르 마네",
    "date": "1874",
    "source": "https://www.metmuseum.org/art/collection/search/436947"
  },
  {
    "id": 437299,
    "title": "퐁투아즈 잘레 언덕",
    "titleEn": "Jalais Hill, Pontoise",
    "artist": "카미유 피사로",
    "date": "1867",
    "source": "https://www.metmuseum.org/art/collection/search/437299"
  },
  {
    "id": 436819,
    "title": "메다 프리마베지",
    "titleEn": "Mäda Primavesi",
    "artist": "구스타프 클림트",
    "date": "1912–13",
    "source": "https://www.metmuseum.org/art/collection/search/436819"
  },
  {
    "id": 437853,
    "title": "살루테 성당 현관에서 본 베네치아",
    "titleEn": "Venice, from the Porch of Madonna della Salute",
    "artist": "윌리엄 터너",
    "date": "ca. 1835",
    "source": "https://www.metmuseum.org/art/collection/search/437853"
  },
  {
    "id": 438821,
    "title": "이아 오라나 마리아",
    "titleEn": "Ia Orana Maria",
    "artist": "폴 고갱",
    "date": "1891",
    "source": "https://www.metmuseum.org/art/collection/search/438821"
  }
];

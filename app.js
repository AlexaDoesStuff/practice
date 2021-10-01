const kanjiItems = [
  {
    "id": "0",
    "kanji": "向き合って",
    "meaning": "to face; to face a problem",
    "example": "大事な問題に直接に向き合ってが必要です。",
    "related": "逆になる"
  },
  {
    "id": "1",
    "kanji": "つくづく",
    "meaning": "deeply; fondly",
    "example": "時々に彼が私につくづくに眺めっていることを気づいた。",
    "related": "注意して"
  },
  {
    "id": "2",
    "kanji": "養う",
    "meaning": "to provide for; to maintain; to nourish",
    "example": "お父さんは家族を養うのため一所懸命に働いている。",
    "related": "応援する"
  }
]

// select items with const and getElementById
const left = document.getElementById("left-click");
const right = document.getElementById("right-click");
const kanjiSection = document.getElementById("kanji");
const answers = document.getElementById("answers");

const meaning = document.getElementById("meaning-field");
const example = document.getElementById("example-field");
const related = document.getElementById("related-field");

// init index for flipping through kanji list 
let currentItem = 0;

function populateFields(item) {
  kanjiSection.textContent = item.kanji;
  meaning.textContent = item.meaning;
  example.textContent = item.example;
  related.textContent = item.related;
}

window.addEventListener("DOMContentLoaded", function() {
  const item = kanjiItems[0];
  populateFields(item);
})

function createRadios(array) {
  const radioDiv = document.createElement("div");
}

// Event listeners to the buttons
right.addEventListener('click', function() {
  if(kanjiItems[currentItem + 1] != null) {
    const x = kanjiItems[currentItem + 1];
    populateFields(x);
    currentItem = currentItem + 1;
  } else {
    populateFields(kanjiItems[0]);
    currentItem = 0;
  }
})

left.addEventListener('click', function() {
  if(currentItem == 0) {
    currentItem = kanjiItems.length - 1;
    console.log(currentItem);
    populateFields(kanjiItems[currentItem]);
  } else {
    currentItem = currentItem - 1;
    populateFields(kanjiItems[currentItem]);
  }
})
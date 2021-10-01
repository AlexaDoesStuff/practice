const quoteLimit = 8;
let curQuote = 0;
let quotes;

const quoteContainer = document.getElementById('quote-container');

function getRangeQuotes(cur, cap, quotes) {
  let renderedQuotes = '';
  for(var i = cur; i < (cap + cur); i++) {
    let quoteCard = `
      <div class="quote col p-4">
        <span class="author">${quotes[i].author != null ? quotes[i].author : ''}</span>
        <span class="saying"><p>${quotes[i].text}</p></span>
      </div>
    `;
    renderedQuotes += quoteCard;
  }
  return renderedQuotes;
}

window.addEventListener('DOMContentLoaded', (event) => {
  fetch('https://type.fit/api/quotes')
  .then((response) => response.json())
  .then((data) => { 
    quoteContainer.innerHTML = getRangeQuotes(0, quoteLimit, data);
    curQuote += 8;
  })
});

window.addEventListener('scroll', () => {
  if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
    fetch('https://type.fit/api/quotes')
    .then((response) => response.json())
    .then((data) => { 
      quoteContainer.innerHTML += getRangeQuotes(curQuote, quoteLimit, data);
      curQuote += 8;
    })
  }
})
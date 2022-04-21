/* Implement GetElementById with recursive 
*
*
*/

const firstButton = document.getElementById('first-button');
const secondButton = document.getElementById('second-button');

function customGetById(id) {
  const element = [];

  const body = document.getElementById('html');
  var error = document.getElementById('first-error');
  
  function iterate(node) {
    for(const elem of node.children) {
      elem.style.backgroundColor = "fuchsia";
      if(elem.id === id) {
        elem.style.backgroundColor = "red";
        element.push(elem);
      }
      iterate(elem);
    }
  }
  iterate(body);

  if(element[0] === undefined) {
    error.innerText = 'Not found!';
  } else {
    error.innerText = '';
  }
}

function printDOMTree(dom) {
  const output = document.getElementById('output');

  const list = document.createElement('ol');

  function getChildren(dom) {
    for(const elem of dom.children) {
      var item = document.createElement('li');
      item.innerText = elem.id;
      list.appendChild(item);

      if(elem.hasChildNodes()) {
        var y = document.createElement('ul');
        for (const child of elem.children) {
          var x = document.createElement('li');
          x.innerText = child.id;
          y.appendChild(x);
        };
        list.appendChild(y);
      }

      getChildren(elem);
    }
  }
  getChildren(dom);
  output.appendChild(list);
}

firstButton.addEventListener('click', function() {
  const id = document.getElementById('get-id');
  console.log(id.value);
  console.log(customGetById(id.value));
});

secondButton.addEventListener('click', function() {
  printDOMTree(document.getElementById('html'));
});
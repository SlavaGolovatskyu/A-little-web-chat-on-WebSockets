const socket = new WebSocket("ws://localhost:5678");
socket.onopen = function(){
  document.querySelector("textarea").addEventListener('keyup', function(e){
    if(e.keyCode === 13){
      if(this.value.trim() === ""){
        return false;
      }
      socket.send(this.value.trim());
      this.value = "";
    }
  });
};

socket.onerror = function(){
  console.log('Ошибка при подключении');
};

const maxMsgOnPage = 15;
let p = "";
let idForElement = 1;
let countCircleMsg = 0;

socket.onmessage = function(e){
  p = document.createElement("p");
  p.innerHTML = e.data;
  p.id = idForElement++;
  if (idForElement > maxMsgOnPage + 1 || countCircleMsg === 1) {
    if ((countCircleMsg === 1 || countCircleMsg === 0) && idForElement > maxMsgOnPage + 1) {
      idForElement = 1;
      countCircleMsg = 1;
    }
    let obj = document.getElementById(`${idForElement}`);
    obj.remove();
  }
  document.querySelector(".message").appendChild(p);
};
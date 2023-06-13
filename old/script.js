var ball = document.getElementById('ball');
var strikeZone = document.getElementById('strike-zone');

strikeZone.addEventListener('dblclick', throwPitch);

/*
document.body.addEventListener('click', prepPitch);

function prepPitch (event){
    newBall();
}
*/

function throwPitch (event){
    moveBall(event);
}

/*
function newBall() {
    var ball = document.querySelector('#ball');
    var clone = ball.cloneNode(true);
    clone.id = 'nextpitch';
    clone.classList.add('visible');
    ball.after(clone);
}
*/

function moveBall(event) {
    var xposition = (event.clientX);
    var yposition = (event.clientY);

    ball.style.position = "absolute";
    ball.style.left = xposition + 'px';
    ball.style.top = yposition + 'px';
}



/*
    clone.ball.cloneNode(true);
    clone.id = 'ball ${i}';
    clone.classList.add('visibility')


     /*$("#clonecontainer").html('');
     for(var i=0; i >= 6; i++){
        var cloner = $("#ball").clone();
        $("#clonecontainer").append(cloner);
  
          clone.ball.cloneNode(true);
          clone.id = 'ball ${i}';
          clone.classList.add('visibility')

function pitchCount() {
    var pitchNumber = document.getElementsByClassName("visible");
    return pitchNumber;
}
*/
// create and append ball div to document on click
// evaluate x and y position to determine if ball or strike
// log result until walk or K is achieved
    // choose pitcher based on ability
    // choose ump based on tolerance

const pitchContainer = document.getElementById('pitch-container')
const pitchableZone = document.getElementById('pitchable-zone')

let umpTolerance = 0 //temporary

const width = window.innerWidth
const height = window.innerHeight

// STRIKE ZONE
const leftSide = ((width / 2) - (170 + umpTolerance))
const rightSide = ((width / 2) + (110 + umpTolerance))
const topZone = ((height / 2) - (250 + umpTolerance))
const bottomZone = ((height / 2) + (185 + umpTolerance))
//

const headerDiv = document.getElementById('header')

const strikeCalls = document.getElementsByClassName('called-strike')
const ballCalls = document.getElementsByClassName('called-ball')

const firstBase = document.getElementById('first')
const secondBase = document.getElementById('second')
const thirdBase = document.getElementById('third')

const thirdOut = document.getElementById('third-out')

const inningCount = document.getElementById('inning-count')
const topInning = document.getElementById('top-inning')
const bottomInning = document.getElementById('bottom-inning')

const score = document.getElementById('score')
const scoreboard = document.getElementById('scoredboard')
let homeScore = 0
let awayScore = 0



function init(){
    listenForPitch()
}



function listenForPitch(){
    pitchableZone.addEventListener('click', (e) => {
        const xPosition = e.clientX - 29
        const yPosition = e.clientY - 29

        ballCreator(xPosition, yPosition)
    })
}

function ballCreator(xPosition, yPosition){ 
    const ball = document.createElement('div')
    
    ball.className = 'baseball'
    
    ball.style.top = yPosition + 'px'
    ball.style.left = xPosition + 'px'

    pitchContainer.append(ball)

    pitchEvaluator(xPosition, yPosition)

    if (pitchContainer.childElementCount >= 2){
        pastPitch(ball)
    }
}

function pastPitch(ball){
    const previousPitch = ball.previousSibling
    previousPitch.style.opacity = .25

    const pitchCount = document.createElement('h2')
    pitchCount.textContent = pitchContainer.childElementCount - 1

    previousPitch.append(pitchCount)
}

function pitchEvaluator(xPosition, yPosition){
    const umpHeight = xPosition >= leftSide && xPosition <= rightSide
    const umpPlate = yPosition >= topZone && yPosition <= bottomZone

    if (umpHeight == true && umpPlate == true){
        callStrike()
    } else {
        callBall()
    }
}

function callStrike(){
    const strikeSymbol = document.querySelector('.strike')
    strikeSymbol.className = 'called-strike'
    strikeOut()
}

function callBall(){
    const strikeSymbol = document.querySelector('.ball')
    strikeSymbol.className = 'called-ball'
    issueWalk()
}

function strikeOut(){
    const thirdStrike = document.getElementById('strikeout')
    let thirdStrikeChecker = window.getComputedStyle(thirdStrike).getPropertyValue('opacity')
    
    if (thirdStrikeChecker == 1){
        const outSymbol = document.querySelector('.out')
        outSymbol.className = 'called-out'

        setTimeout(pitchReset, 2000)
        inningChanger()
    }  
}

function issueWalk(){
    const fourthBall = document.getElementById('walk')
    let fourthBallChecker = window.getComputedStyle(fourthBall).getPropertyValue('opacity')
    if (fourthBallChecker == 1){ 
        baseLoader()
        setTimeout(pitchReset, 2000)
    }
}

function pitchReset(){
    pitchContainer.innerHTML = ''

    for (let i = 0; i < strikeCalls.length; i + 1){
        strikeCalls[i].className = 'strike'
    }
    for (let i = 0; i < ballCalls.length; i + 1){
        ballCalls[i].className = 'ball'
    }
}

function baseLoader(){
    let firstBaseOpacity = window.getComputedStyle(firstBase).getPropertyValue('opacity')
    let secondBaseOpacity = window.getComputedStyle(secondBase).getPropertyValue('opacity')
    let thirdBaseOpacity = window.getComputedStyle(thirdBase).getPropertyValue('opacity')

    if (firstBaseOpacity == .25){ 
        firstBase.style.opacity = 1
    }
    if (firstBaseOpacity == 1 && secondBaseOpacity == .25){
        secondBase.style.opacity = 1
    }
    if (secondBaseOpacity == 1 && thirdBaseOpacity == .25){
        thirdBase.style.opacity = 1
    }
    if (thirdBaseOpacity == 1){
        scoreChanger()
    }
}

function scoreChanger(){
    let topInningOpacity = window.getComputedStyle(topInning).getPropertyValue('opacity')
    let bottomInningOpacity = window.getComputedStyle(bottomInning).getPropertyValue('opacity')

    if (topInningOpacity == 1){
        awayScore++
    }
    if (bottomInningOpacity == 1){
        homeScore++
    }

    score.textContent = `HOME : ${homeScore} - ${awayScore} : AWAY`
}

function inningChanger(){
    let thirdOutOpacity = window.getComputedStyle(thirdOut).getPropertyValue('opacity')
    let topInningOpacity = window.getComputedStyle(topInning).getPropertyValue('opacity')
    let bottomInningOpacity = window.getComputedStyle(bottomInning).getPropertyValue('opacity')

    if (thirdOutOpacity == 1){
        if (topInningOpacity == 1){
            topInning.style.opacity = .25
            bottomInning.style.opacity = 1
            inningReset()
        }
        if (bottomInningOpacity == 1){
            topInning.style.opacity = 1
            bottomInning.style.opacity = .25

            let inning = parseInt(inningCount.textContent)
            inningCount.textContent = inning + 1
            inningReset()
        }
    }
}

function inningReset(){
    pitchReset()
    firstBase.style.opacity = .25
    secondBase.style.opacity = .25
    thirdBase.style.opacity = .25

    let outCount = document.getElementsByClassName('called-out')
    for (let i = 0; i < outCount.length; i + 1){
        outCount[i].className = 'out'
    }
}



init()
const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector("[data-computer-score]")
const yourScoreSpan = document.querySelector("[data-your-score]")
const teamPopupButton = document.querySelector(".select-team")
const teamPopup = document.querySelector(".team-select-popup")
const teamSelectionButtons = document.querySelectorAll('.team-selection')
const brukButton = document.querySelector("#bruk")
const removeButton = document.querySelector("#remove")
const portraitDivs = document.querySelectorAll(".team-roster-position")
const fightButton = document.querySelector("#start-fight")


const playerTeam = [];
const enemyTeam = [];
const SELECTIONS = [
    {
        name: "rock",
        beats: "scissors"
    },
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "scissors",
        beats: "paper"
    }
]

const TEAM_SELECTIONS = [
    {
        name: "bruk",
        sprite: "/assets/images/bruk-sprite.png",
        icon: "/assets/images/bruk-icon.png"
    },
    {
        name: "blinky",
        sprite: "/assets/images/blinky-sprite.png",
        icon: "/assets/images/blinky-icon.png"
    },
    {
        name: "blady"
    }

]

/*brukButton.addEventListener("click", e => {

    playerTeam.push("bruk")
    console.log(newMonster)...MonstersDeck["m001"].name
})*/

teamSelectionButtons.forEach(teamSelectionButtons => {
    teamSelectionButtons.addEventListener('click', e => {
        const selectedMonster = teamSelectionButtons.dataset.monster
        const monster = TEAM_SELECTIONS.find(monster => monster.name === selectedMonster)
        console.log(monster.sprite)

        if(playerTeam.length < 6) {
        playerTeam.push(monster)
        console.log(playerTeam)
        
        for(let i = 0; i < playerTeam.length; i++)
        {
            portraitDivs[i].style.backgroundImage = "url(" + playerTeam[i].icon + ")";
        }
        } else {
            
            console.log("Team full")
        }
    })
})

removeButton.addEventListener("click", e => {
    if(playerTeam.length >= 1) {
        let i = playerTeam.length - 1

        portraitDivs[i].style.backgroundImage = "url(/assets/images/empty-icon.png";

        playerTeam.pop()

        console.log(playerTeam)
    } else {
        console.log("Team empty")
    }
})

fightButton.addEventListener('click', createEnemyTeam)


selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)

    })

})

teamPopupButton.addEventListener("click", e =>{
        if(teamPopup.classList.contains("show")){ 
            teamPopup.classList.remove("show")
            console.log(teamPopup.classList);
        } else { !teamPopup.classList.contains("show") 
            teamPopup.classList.add("show");
            console.log(teamPopup.classList)}
        
    });



function makeSelection(selection){
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const oppWinner = isWinner(computerSelection, selection);

    addSelectionResult(computerSelection, oppWinner);
    addSelectionResult(selection, yourWinner);
    if (yourWinner) incrementScore(yourScoreSpan)
    if (oppWinner)incrementScore(computerScoreSpan)
}

function incrementScore(scoreSpan)
{
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner){
    const div = document.createElement("div")
    div.innerText = selection.name
    div.classList.add("result-selection")
    if(winner) div.classList.add("winner")
    finalColumn.after(div)
    
}

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name
}

function randomSelection(){
    const randomInt = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomInt]
}

function createEnemyTeam(){
    for(let i = 0; i < playerTeam.length; i++){
        const randInt = Math.floor(Math.random() * TEAM_SELECTIONS.length)
        enemyTeam.push(TEAM_SELECTIONS[randInt])
    }
    console.log(enemyTeam)
}
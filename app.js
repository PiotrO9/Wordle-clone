let MaximumAmountOfTiles = 30;
let CurrentTile = 0;
let MinLetterIndex = 0;
let MaxLetterIndex = 5;
let CompletedWords = 0;

let ArrayOfWords = ["KAJAK", "HAMAK", "ZAMEK", "PTAKI", ""];
let WordToDiscover = DiscoverWord();
console.log(WordToDiscover);

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

const BackspaceTile = document.querySelector("#Backspace");
const EnterTile = document.querySelector("#Enter");

const ResultPopUp = document.querySelector("#ResultPopUp");
const CloseButton = document.querySelector("#PopUp__button");
const PasswordAnswer = document.querySelector("#PasswordAnswer");
const Result = document.querySelector("#Result");

const KeyboardTiels = document.querySelectorAll(".KeyboardTile");
const GridItems = document.querySelectorAll(".grid-item");

KeyboardTiels.forEach(tile => {
tile.addEventListener('click', function(){
        if(CurrentTile < MaximumAmountOfTiles && CurrentTile < MaxLetterIndex)
        {
            GridItems[CurrentTile].innerHTML = tile.innerHTML;
            CurrentTile++;
        }
    });
});

BackspaceTile.addEventListener("click",function(){
    if(CurrentTile > MinLetterIndex)
    {
        CurrentTile--;
        GridItems[CurrentTile].innerHTML = "";
        console.log(CurrentTile);
    }
    else if(CurrentTile == MinLetterIndex)
    {
        GridItems[CurrentTile].innerHTML = "";
        console.log(CurrentTile);
    }
});

EnterTile.addEventListener("click", function(){
    if(((CurrentTile + 1) % 5) && CurrentTile != 0)
    {
        let TempWord = "";

        for(let i = 5;i > 0;i--)
        {
            let CurrentOperationTileNumber = CurrentTile - i;
            let Temp = GridItems[CurrentOperationTileNumber].innerHTML;
            TempWord += Temp;
        }

        if(!CheckWordCoretness(TempWord))
        {
            return;
        }
        else
        {
            MinLetterIndex += 5;
            MaxLetterIndex += 5;

            console.log(TempWord);
        }

        for(let i = 5;i > 0;i--)
        {
            let CurrentOperationTileNumber = CurrentTile - i;
            let Temp = GridItems[CurrentOperationTileNumber].innerHTML;

            if(WordToDiscover.indexOf(Temp) > -1)
            {
                GridItems[CurrentOperationTileNumber].classList.remove("TileAtCorrectPosition");
                GridItems[CurrentOperationTileNumber].classList.add("TileAtWrongPosition");
            }

            let CalculateTemporary = CurrentOperationTileNumber - (CompletedWords * 5);

            if(WordToDiscover[CalculateTemporary] === Temp)
            {
                GridItems[CurrentOperationTileNumber].classList.remove("TileAtWrongPosition");
                GridItems[CurrentOperationTileNumber].classList.add("TileAtCorrectPosition");
            }   
        }

        CompletedWords++;

        if(TempWord === WordToDiscover)
        {
            console.log("Win");
            SetLoyoutAsWin();
            ShowPopUp();
            return;
        }
        else
        {
            if(CurrentTile == MaximumAmountOfTiles)
            {
                SetLoyoutAsLose();
                ShowPopUp();
                console.log("Lose");
                return;
            }
        }
    }
});

CloseButton.addEventListener("click", function(){
    HidePopUp();
    RestartGame();
})

function CheckWordCoretness(word)
{
    return (ArrayOfWords.indexOf(word) > -1);
}

function DiscoverWord()
{
    let min = 0;
    let max = ArrayOfWords.length;
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    console.log(rand);
    return ArrayOfWords[rand];
}

function RestartGame()
{
    DiscoverWord();
    GridItems.forEach(item => {
        item.classList.remove("TileAtCorrectPosition", "TileAtWrongPosition");
        item.innerHTML = "";
    })
    CurrentTile = 0;
    MinLetterIndex = 0;
    MaxLetterIndex = 5;
    CompletedWords = 0;
    console.log(WordToDiscover);
}

function ShowPopUp()
{
    tl.fromTo("#ResultPopUp", { opacity: 0 }, { opacity: 1, duration: 1 });
}

function HidePopUp()
{
    tl.fromTo("#ResultPopUp", { opacity: 1 }, { opacity: 0, duration: 1 });
}

function SetLoyoutAsWin()
{
    const ResultPopUpElement = document.getElementById("ResultPopUp");
    ResultPopUpElement.style.backgroundColor = "green";
    ResultPopUpElement.style.color = "white";
    ResultPopUpElement.style.fontSize = "35px";

    Result.innerHTML = "Zwycięstwo";
}

function SetLoyoutAsLose()
{
    const ResultPopUpElement = document.getElementById("ResultPopUp");
    ResultPopUpElement.style.backgroundColor = "red";
    ResultPopUpElement.style.color = "white";
    ResultPopUpElement.style.fontSize = "28px";
    
    Result.innerHTML = "Przegrana";
    PasswordAnswer.innerHTML = "Wyraz to: " + WordToDiscover;

}
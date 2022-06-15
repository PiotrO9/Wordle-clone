import {test} from './DesignFunctions.js';

let MaximumAmountOfTiles = 30;
let CurrentTile = 0;
let MinLetterIndex = 0;
let MaxLetterIndex = 5;
let CompletedWords = 0;

let ArrayOfWords = ["KAJAK", "HAMAK", "ZAMEK", "PTAKI", "RADOM", "AKORD", "NOKIA", "ALEJA", "DROGA", "OBIAD", "ATUTY", "ASTMA", "ATLAS", "PLECY", "ANEKS", 
                    "AKCJA", "BAJKA", "BANAN", "BARON", "BYTOM", "BEJCA", "BILET", "BIGOS", "BLADY", "BAGNO", "CEWKA", "CHORA", "CHLEB", "DOMEK", "DUCHY",
                    "ELITA", "EPIKA", "FARBA", "FARMA", "FRAZA", "FELGA", "FUTRO", "FRYTY", "GROTA", "HAMAK", "HONOR", "ISKRA", "INDIE", "JAJKO", "KEBAB",
                    "KASZA", "KATAR", "KOMIN", "LIMIT", "LITRY", "LAMPA", "LWICA", "MAGIA", "MAFIA", "MUCHA", "KOMAR", "MNICH", "MODNA", "OBCAS", "OBAWA",
                    "OBIAD", "OBAWA", "OCENA", "OPERA", "OPCJA", "PACHA", "PUDEL", "PALCE", "PALEC", "PASZA", "PEPSI", "PIZZA", "PLAGA", "ROWER", "SABAT",
                    "SALWA", "SAUNA", "SKALA", "SELER", "SERCE", "SFERA", "TAFLA", "TAJGA", "TENIS", "WALEC", "RADIO", "KUTAS", "TATRY"];
let WordToDiscover = DiscoverWord();
test();

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

const BackspaceTile = document.querySelector("#Backspace");
const EnterTile = document.querySelector("#Enter");

const ResultPopUp = document.querySelector("#ResultPopUp");
const CloseButton = document.querySelector("#PopUp__button");
const PasswordAnswer = document.querySelector("#PasswordAnswer");
const Result = document.querySelector("#Result");

const KeyboardTiels = document.querySelectorAll(".Keyboard__Tile");
const GridItems = document.querySelectorAll(".Grid__item");

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
    }
    else if(CurrentTile == MinLetterIndex)
    {
        GridItems[CurrentTile].innerHTML = "";
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
    return ArrayOfWords[rand];
}

function RestartGame()
{
    WordToDiscover = DiscoverWord();
    GridItems.forEach(item => {
        item.classList.remove("TileAtCorrectPosition", "TileAtWrongPosition");
        item.innerHTML = "";
    })
    CurrentTile = 0;
    MinLetterIndex = 0;
    MaxLetterIndex = 5;
    CompletedWords = 0;
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
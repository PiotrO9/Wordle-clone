let MaximumAmountOfTiles = 30;
let CurrentTile = 0;
let MinLetterIndex = 0;
let MaxLetterIndex = 5;

let ArrayOfWords = ["PALEC", "PALCE", "KAJAK"];
let WordToDiscover = DiscoverWord();

console.log(WordToDiscover);

const BackspaceTile = document.querySelector("#Backspace");
const EnterTile = document.querySelector("#Enter");

const KeyboardTiels = document.querySelectorAll(".KeyboardTile");
const GridItems = document.querySelectorAll(".grid-item");

KeyboardTiels.forEach(tile => {
tile.addEventListener('click', function(){
        if(CurrentTile == MaximumAmountOfTiles)
        {
            console.log("Lose");
            return;
        }

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
        GridItems[CurrentTile].innerHTML = "";
        CurrentTile--;
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
            if(WordToDiscover[CurrentOperationTileNumber] === Temp)
            {
                GridItems[CurrentOperationTileNumber].classList.add("TileAtCorrectPosition");
            }
            else if(WordToDiscover.indexOf(Temp) > -1)
            {
                GridItems[CurrentOperationTileNumber].classList.add("TileAtWrongPosition");
            }
        }

        if(TempWord === WordToDiscover)
        {
            console.log("Win");
            return;
            //Win
        }

        if(CheckWordCoretness(TempWord))
        {
            MinLetterIndex += 5;
            MaxLetterIndex += 5;
            
            console.log(TempWord);
        }
    }
});

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
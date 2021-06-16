function cancleBottomBlockTransition_DoubleColumn() {
    let blockNumber = document.getElementsByClassName("theBlocks").length;
    let blocksIsOdd = false; //如果block数为奇数，则为true
    if (blockNumber % 2 === 0)
        blockNumber = blockNumber - 1;
    else {
        blockNumber = (blockNumber + 1) / 2 - 1;
        blocksIsOdd = true;
    }
    document.getElementsByClassName("theBlocks")[blockNumber].getElementsByClassName("content-pessage")[0].style.transitionProperty = "none";
    document.getElementsByClassName("theBlocks")[blockNumber].className += " preventHover";
    if (blocksIsOdd) {
        document.getElementById("grid-container").style.height = `${600 + (blockNumber - 2) * 455 + (blockNumber - 1) * 355}px`;
    }
    else {
        document.getElementById("grid-container").style.height = `${((blockNumber + 1) / 2) * 455 - 100}px`;
    }
}

function cancleBottomBlockTransition_SingleColumn() {
    let blockNumber = document.getElementsByClassName("theBlocks").length - 1;
    document.getElementsByClassName("theBlocks")[blockNumber].getElementsByClassName("content-pessage")[0].style.transitionProperty = "none";
    document.getElementsByClassName("theBlocks")[blockNumber].className += " preventHover";
    if(blockNumber > 2){
        document.getElementById("grid-container").style.height = `${955 + (blockNumber - 2) * 455}px`;
    }
    else{
        document.getElementById("grid-container").style.height = `955px`;
    }
}
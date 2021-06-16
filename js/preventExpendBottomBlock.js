function cancleBottomBlockTransition(){
    let blockNumber = document.getElementsByClassName("theBlocks").length;
    if (blockNumber % 2 === 0)
        blockNumber = blockNumber - 1;
    else
        blockNumber = (blockNumber + 1) / 2 - 1;
    document.getElementsByClassName("theBlocks")[blockNumber].getElementsByClassName("content-pessage")[0].style.transitionProperty = "none";
    document.getElementsByClassName("theBlocks")[blockNumber].className += " preventHover";
}
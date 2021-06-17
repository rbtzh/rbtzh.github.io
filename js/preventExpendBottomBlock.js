function cancleBottomBlockTransition_DoubleColumn() {
    let blockNumberDouble = document.getElementsByClassName("theBlocks").length;
    let blocksIsOdd = false; //如果block数为奇数，则为true
    if (blockNumberDouble % 2 === 0)
        blockNumberDouble = blockNumberDouble - 1;
    else {
        blockNumberDouble = (blockNumberDouble + 1) / 2 - 1;
        blocksIsOdd = true;
    }
    document.getElementsByClassName("theBlocks")[blockNumberDouble].getElementsByClassName("content-pessage")[0].style.transitionProperty = "none";
    document.getElementsByClassName("theBlocks")[blockNumberDouble].className += " preventHover";
    if (blocksIsOdd) {
        document.getElementById("grid-container").style.height = `${600 + (blockNumberDouble - 3) * 455 + (blockNumberDouble - 1) * 355 + 100}px`;
    }
    else {
        document.getElementById("grid-container").style.height = `${((blockNumberDouble + 1) / 2) * 455 - 200}px`;
    }
}

function cancleBottomBlockTransition_SingleColumn() {
    let blockNumberSingle = document.getElementsByClassName("theBlocks").length - 1;
    document.getElementsByClassName("theBlocks")[blockNumberSingle].getElementsByClassName("content-pessage")[0].style.transitionProperty = "none";
    document.getElementsByClassName("theBlocks")[blockNumberSingle].className += " preventHover";
    if(blockNumberSingle > 2){
        document.getElementById("grid-container").style.height = `${955 + (blockNumberSingle - 2) * 455}px`;
    }
    else{
        document.getElementById("grid-container").style.height = `955px`;
    }
}
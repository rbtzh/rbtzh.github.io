function cancleBottomBlockTransition_DoubleColumn() {
    let blockNumberDouble = document.getElementsByClassName("theBlocks").length; //blockNumberDouble 为 theBlocks 数量
    let blocksIsOdd = false; //如果block数为奇数，则为true
    if (blockNumberDouble % 2 === 0)
        blockNumberDouble = blockNumberDouble - 1; //如果是偶数，blockNumberDouble 为最后一个 theBlocks 的序数
    else {
        blockNumberDouble = (blockNumberDouble + 1) / 2 - 1; //如果是奇数，blockNumberDouble 为中间那个 theBlocks 的序数
        blocksIsOdd = true;
    }
    document.getElementsByClassName("theBlocks")[blockNumberDouble].getElementsByClassName("content-pessage")[0].style.transitionProperty = "none";
    document.getElementsByClassName("theBlocks")[blockNumberDouble].className += " preventHover";
    if (blocksIsOdd) {
        document.getElementById("grid-container").style.height = `${600 + (blockNumberDouble -1) * 355}px`; 
        //奇数，左边突出，355 为未展开内容块的高度，600为标题与社交链接的最大高度，现在展开时会溢出
    }
    else {
        document.getElementById("grid-container").style.height = `${((blockNumberDouble + 1) / 2) * 355}px`; //偶数，右边突出
    }
    //现在要在展开时更改 grid-container 的 height，加上 100px 以防止溢出
    $('#grid-container').css('height',parseInt($('#grid-container').css('height').replace("px", ""), '10') + 100 + "px");
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
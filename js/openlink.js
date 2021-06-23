$(function(){
    let selectedBlock = $('#grid-container > div:first-child');
    for(let i = 1;i <= $('.theBlocks').length; i++){
        selectedBlock.next();
        let linkURL = $(selectedBlock).attr('linkurl');
        selectedBlock.click(function(){
            window.open(linkURL);
        })
    }
})
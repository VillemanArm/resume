const openBlock = () => {

    const BlockWraps = document.querySelectorAll(".opening-block");

    BlockWraps.forEach((wrap) => {
        wrap.querySelector('div').addEventListener("click", (e) => {
            wrap.classList.toggle('block-clicked')
            if (window.innerWidth > 768) {
                if (blocksIsClicked(e)) {
                    e.target.closest('.container').style.paddingBottom = "4rem";
                } else {
                    e.target.closest('.container').style.paddingBottom = "16rem";
                }
            }
        });
    });

    const blocksIsClicked = (e) => {
        const currentBlocks = e.target.closest('.container').querySelectorAll('.opening-block')
        let isClicked = false
        currentBlocks.forEach((block) => {
            if (block.classList.contains('block-clicked')) isClicked = true
        })
        return isClicked
    }
}

export default openBlock
let overSkillRateFlexBefore = 0;

const overSkillRateFlex = nodecg.Replicant('skillrateFlex');

const overVictory = nodecg.Replicant('victory');
const overDefeat = nodecg.Replicant('defeat');
const overDraw = nodecg.Replicant('draw');

const visibleFlex = nodecg.Replicant('visibleFlex');

// position visible change
visibleFlex.on('change', newVal => {
    if (newVal == true) {
        $('.l1').removeClass('disable');
    }
    else {
        $('.l1').addClass('disable');
    }
})

// skillrate change
overSkillRateFlex.on('change', newVal => {
    AnimeNum('#skillrateFlex', overSkillRateFlexBefore, newVal);
    overSkillRateFlexBefore = newVal;
})

overVictory.on('change', newVal => {
    AnimeNum('#victory', 0, newVal);
})

overDefeat.on('change', newVal => {
    AnimeNum('#defeat', 0, newVal);
})

overDraw.on('change', newVal => {
    AnimeNum('#draw', 0, newVal);
});

function AnimeNum(targets, before, newVal) {
    anime({
        targets: targets,
        autoplay: true,
        loop: false,
        duration: 1000,
        innerHTML: [before, newVal],
        direction: 'alternate',
        easing: 'easeInOutQuad',
        round: 1
    });
}
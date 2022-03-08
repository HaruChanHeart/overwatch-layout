let skillrateBefore = {
    tank: 0,
    damage: 0,
    support: 0,
    flex: 0
}

const overSkillRateTank = nodecg.Replicant('skillrateTank');
const overSkillRateDamage = nodecg.Replicant('skillrateDamage');
const overSkillRateSupport = nodecg.Replicant('skillrateSupport');
const overSkillRateFlex = nodecg.Replicant('skillrateFlex');

const mode = nodecg.Replicant('mode');

const visibleTank = nodecg.Replicant('visibleTank');
const visibleDamage = nodecg.Replicant('visibleDamage');
const visibleSupport = nodecg.Replicant('visibleSupport');
const visibleFlex = nodecg.Replicant('visibleFlex');

// mode change
mode.on('change', newVal => {
    if (newVal == "modeHorizontal") {
        $('#mode').removeClass('vertical');
        $('#mode').removeClass('rotation');
        $('#mode').addClass('horizontal');
        RotationReset();
    }
    else if (newVal == "modeVertical") {
        $('#mode').removeClass('horizontal');
        $('#mode').removeClass('rotation');
        $('#mode').addClass('vertical');
        RotationReset();
    }
    else if (newVal == "modeRotation") {
        $('#mode').removeClass('vertical');
        $('#mode').removeClass('horizontal');
        $('#mode').addClass('rotation');
        RotationMode();
    }
})

// position visible change
visibleTank.on('change', newVal => {
    RotationModeFix(newVal, '.l1');
})

visibleDamage.on('change', newVal => {
    RotationModeFix(newVal, '.l2');
})

visibleSupport.on('change', newVal => {
    RotationModeFix(newVal, '.l3');
})

visibleFlex.on('change', newVal => {
    RotationModeFix(newVal, '.l4');
})

// skillrate change
overSkillRateTank.on('change', newVal => {
    AnimeNum('#skillrateTank', skillrateBefore[0], newVal);
    skillrateBefore[0] = newVal;
})

overSkillRateDamage.on('change', newVal => {
    AnimeNum('#skillrateDamage', skillrateBefore[1], newVal);
    skillrateBefore[1] = newVal;
})

overSkillRateSupport.on('change', newVal => {
    AnimeNum('#skillrateSupport', skillrateBefore[2], newVal);
    skillrateBefore[2] = newVal;
})

overSkillRateFlex.on('change', newVal => {
    AnimeNum('#skillrateFlex', skillrateBefore[3], newVal);
    skillrateBefore[3] = newVal;
})

function RotationReset() {
    anime.remove('.l1');
    anime.remove('.l2');
    anime.remove('.l3');
    anime.remove('.l4');
    anime.remove('#border_color');
    
    // Count Rotation
    anime({
        targets: ['.l1', '.l2', '.l3', '.l4'],
        autoplay: true,
        loop: false,
        duration: 0,
        translateY: 0,
        opacity: 1
    });
    
    // Timer Line
    anime.timeline({
        targets: ['#border_color'],
        autoplay: true,
        loop: false,
        duration: 0,
        width: "100%",
        opacity: 1
    });
}

function RotationModeFix(newValVisible, className) {
    if (newValVisible == true) {
        $(className).removeClass('disable');
    }
    else {
        $(className).addClass('disable');
    }
    mode.on('change', newVal => {
        if (newVal == 'modeRotation') {
            RotationMode();
        }
    });
}

function RotationMode() {
    // Count Rotation
    let rotation = anime.timeline({
        autoplay: true,
        loop: true,
        direction: 'linear',
    })
    
    anime.remove('.l1');
    anime.remove('.l2');
    anime.remove('.l3');
    anime.remove('.l4');
    anime.remove('#border_color');
    
    // Timer Line
    anime.timeline({
        targets: ['#border_color'],
        autoplay: true,
        loop: true,
        direction: 'linear',
        easing: 'easeOutQuad'
    }).add({
        duration: 9500,
        width: ["0%", "100%"]
    }).add({
        duration: 500,
        opacity: [1, 0],
    });

    visibleTank.on('change', newVal => {
        if (newVal == true) {
            AnimateRotation(rotation, '.l1');
        }
    });

    visibleDamage.on('change', newVal => {
        if (newVal == true) {
            AnimateRotation(rotation, '.l2');
        }
    });
    
    visibleSupport.on('change', newVal => {
        if (newVal == true) {
            AnimateRotation(rotation, '.l3');
        }
    });

    visibleFlex.on('change', newVal => {
        if (newVal == true) {
            AnimateRotation(rotation, '.l4');
        }
    });
}

// animejs function
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

function AnimateRotation(data, targets) {
    data.add({
        targets: targets,
        duration: 500,
        translateY: {
            value: ["-1em", 0],
            easing: "easeOutBounce"
        },
        opacity: {
            value: [0, 1],
            easing: 'easeInOutQuad'
        }
    }).add({
        targets: targets,
        duration: 9000,
        translateY: 0
    }).add({
        targets: targets,
        duration: 500,
        translateY: {
            value: [0, "1em"],
            easing: "easeInQuad"
        },
        opacity: {
            value: [1, 0],
            easing: 'easeInOutQuad'
        }
    });
}
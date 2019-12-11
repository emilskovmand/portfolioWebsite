////////////////////////////////////////////////// !
//! Base values                                 // !
////////////////////////////////////////////////// !

// * Mouse movement
var Me = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
window.addEventListener('mousemove', (e) => {
    Me.x = e.clientX
    Me.y = e.clientY
})


var scene = document.getElementById('background');
var parallaxInstance = new Parallax(scene)

// ! Skruer lidt ned for turbulensen af hyppige EventListeners

function debounce(func, wait = 10, immediate = true) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const nearestValue = (arr, val) => arr.reduce((p, n) => (Math.abs(p) > Math.abs(n - val) ? n - val : p), Infinity) + val

////////////////////////////////////////////////// !
//! Base values Ending                          // !
////////////////////////////////////////////////// !

////////////////////////////////////////////////// !
//! Scrollers                                   // !
////////////////////////////////////////////////// !

// * Tilføj flere jumpers med nye objects :
const jumpers = [{
    point: document.getElementById('startJump'),
    warp: document.getElementsByTagName('main')[0]
}]

jumpers.forEach(arg => arg.point.addEventListener('click', () => {
    arg.warp.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
    });
}));

////////////////////////////////////////////////// !
// ! End of Scrollers                           // !
////////////////////////////////////////////////// !

////////////////////////////////////////////////// !
// ! DaysCounter                                // !
////////////////////////////////////////////////// !

const dayCon = document.getElementById('DaysAmount');

function daysCalculator() {
    var dateBegan = Math.floor(new Date("07/30/2019").getTime())
    var dateToday = Math.floor(new Date().getTime())

    const days = Math.round(((dateToday - dateBegan) / 1000 / 60 / 60 / 24) * 10) / 10;
    dayCon.innerHTML = days
}

////////////////////////////////////////////////// !
// ! End of DaysCounter                         // !
////////////////////////////////////////////////// !

////////////////////////////////////////////////// !
//! TypeWriter                                  // !
////////////////////////////////////////////////// !
const typeSubjects = ['a student', 'a developer', 'a son', 'a programmer', 'a thinker', 'a dane'];
let typeCall = document.getElementById('typeWriter');

// Speed = 90ms

var typeWriter = function () {
    let forwards = true;
    let offset = 0;
    let i = 0;
    let skipCount = 0;
    let skipDelay = 20;
    let current = '';
    let typeWriteinterval = setInterval(() => {
        if (forwards) {
            if (offset >= typeSubjects[i].length) {
                skipCount++
                if (skipCount == skipDelay) {
                    forwards = false
                    offset = 0
                    skipCount = 0
                }
            } else {
                current += typeSubjects[i].charAt(offset)
                offset++
            }
        } else if (!forwards) {
            current = current.slice(0, -1)
            if (current.length <= 0) {
                skipCount++
                if (skipCount == skipDelay / 10) {
                    forwards = true
                    skipCount = 0
                    i++
                }
            }
            if (i >= typeSubjects.length) {
                i = 0
            }
        }
        typeCall.innerText = current
    }, 90);
}


////////////////////////////////////////////////// !
// ! End of TypeWriter                          // !
////////////////////////////////////////////////// !

////////////////////////////////////////////////// !
// ! LanguageSwitcher                           // !
////////////////////////////////////////////////// !

//todo EN & DA

const buttons = document.querySelectorAll('.languageSelect');
const subs = document.getElementsByClassName('LanguageSwitcher');

const EnglishArray = [];

for (let i = 0; i < subs.length; i++) {
    EnglishArray.push(subs[i].textContent)
}

const DanishArray = [];

for (let i = 0; i < subs.length; i++) {
    DanishArray.push(subs[i].childNodes[1].data)
}

function regard(la) {
    const span = document.getElementById('regard')
    const engRegards = [[5, 17, 19],['Good morning', 'Good afternoon', 'Good evening']]
    const daRegards = [[6, 10, 13.2, 14.5, 21.5],['Godmorgen', 'God formiddag', 'Goddag', 'God eftermiddag', 'Godaften']];
    const time = new Date().getHours()
    if (la == 'EN') {
        let interval = nearestValue(engRegards[0], time)
        let printedString = engRegards[1][engRegards[0].findIndex(e => e == interval)]
        span.innerText = printedString
    } else if (la == 'DA') {
        let interval = nearestValue(daRegards[0], time)
        let printedString = daRegards[1][daRegards[0].findIndex(e => e == interval)]
        span.innerText = printedString
    }
}
regard('EN')

function LanguageSwitcher(language) {
    let ArraySelect = [];
    if (language.startsWith('D')) {
        ArraySelect = DanishArray
    } else if (language.startsWith('E')) {
        ArraySelect = EnglishArray
    }

    for (let i = 0; i < subs.length; i++) {
        subs[i].textContent = ArraySelect[i]
    }
    regard(language)
}

buttons.forEach(b => b.addEventListener('click', () => {
    let lang = b.dataset.lang
    if (lang == "DA" && b.classList.contains('active') == false) {
        buttons[0].classList.remove('active')
        b.classList.add('active')
        LanguageSwitcher(lang)
    } else if (lang == "EN" && b.classList.contains('active') == false) {
        buttons[1].classList.remove('active')
        b.classList.add('active')
        LanguageSwitcher(lang)
    }
}))

////////////////////////////////////////////////// !
// ! End of LanguageSwitcher                    // !
////////////////////////////////////////////////// !

////////////////////////////////////////////////// !
//! Window.EventListeners                       // !
////////////////////////////////////////////////// !

window.onload = () => {
    typeWriter()
    daysCalculator()
    if (navigator.language.startsWith('da')) {
        buttons[0].classList.remove('active')
        buttons[1].classList.add('active')
        LanguageSwitcher("DA")
    }
}
// DOM elements

const resultEl = document.getElementById('result');
const clipboardEl = document.getElementById('clipboard');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    textarea.value = resultEl.innerText;
    if(!textarea.value){
        return '';
    }
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password copied to CLipboard!!!");
});

const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

generateEl.addEventListener('click', function() {
    const length = +lengthEl.value;
    const hasUpper = upperEl.checked;
    const hasLower = lowerEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;
    
    resultEl.innerText = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
});

function generatePassword(length, upper, lower, number, symbol) {
    //console.log(length, upper, lower, number, symbol);

    let generatedPass = '';

    const typesCount = upper + lower + number + symbol;
    //console.log(typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(filterArr);
    //console.log(typesArr);

    if(!typesCount) {
        return '';
    }

    for(let i = 0; i < length ; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            //console.log(funcName);
            generatedPass += randomFunc[funcName]();
        });

    }

    return generatedPass.slice(0, length);

}

function filterArr(item) {
    return Object.values(item)[0];
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}

//console.log(getRandomSymbol());
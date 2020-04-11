"use strict";
// 타입스크립트가 명확하게 알고 있는 타입에 대해서는 굳이 타입을 정의하지 않아도 된다.
var numberOne = Math.ceil(Math.random() * 9);
var numberTwo = Math.ceil(Math.random() * 9);
var result = numberOne * numberTwo;
var boolean = true;
var word = document.createElement('div');
word.textContent = numberOne + " \uACF1\uD558\uAE30 " + numberTwo + "\uB294?";
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
input.type = 'number';
form.append(input);
var button = document.createElement('button');
button.textContent = '입력!';
form.append(button);
var resultDiv = document.createElement('div');
document.body.append(resultDiv);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        resultDiv.textContent = '딩동댕';
        numberOne = Math.ceil(Math.random() * 9);
        numberTwo = Math.ceil(Math.random() * 9);
        result = numberOne * numberTwo;
        word.textContent = numberOne + " \uACF1\uD558\uAE30 " + numberTwo + "\uB294?";
        input.value = '';
        input.focus();
    }
    else {
        resultDiv.textContent = "땡";
        input.value = '';
        input.focus();
    }
});

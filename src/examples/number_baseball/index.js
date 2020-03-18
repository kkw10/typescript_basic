var body = document.body;
var candidate;
var tempArray = [];
function chooseNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    tempArray = [];
    for (var i = 0; i < 4; i += 1) {
        var chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        tempArray.push(chosen);
    }
}
function makeHTML() {
    var result = document.createElement('h1');
    body.append(result);
    var form = document.createElement('form');
    body.append(form);
    var input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 4;
    form.append(input);
    var button = document.createElement('button');
    button.textContent = '입력';
    form.append(button);
    return [result, form, input, button];
}
function addEvent(element) {
    var result = element[0], form = element[1], input = element[2], button = element[3];
    var wrongCount = 0;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var answer = input.value;
        if (answer === tempArray.join('')) {
            result.textContent = '홈런';
            input.value = '';
            input.focus();
            chooseNumber();
        }
        else {
            var answerArray = answer.split('');
            var strike = 0;
            var ball = 0;
            wrongCount += 1;
            if (wrongCount > 10) {
                result.textContent = "10\uBC88 \uB118\uAC8C \uD2C0\uB824\uC11C \uC2E4\uD328! \uB2F5\uC740 " + tempArray.join(',') + "\uC600\uC2B5\uB2C8\uB2E4.";
                input.value = '';
                input.focus();
                chooseNumber();
                wrongCount = 0;
            }
            else {
                console.log('답이 틀리면', answerArray);
                for (var i = 0; i <= 3; i += 1) {
                    if (Number(answerArray[i]) === tempArray[i]) {
                        strike += 1;
                    }
                    else if (tempArray.indexOf(Number(answerArray[i])) > -1) {
                        ball += 1;
                    }
                }
                result.textContent = strike + "\uC2A4\uD2B8\uB77C\uC774\uD06C, " + ball + "\uBCFC\uC785\uB2C8\uB2E4.";
                input.value = '';
                input.focus();
            }
        }
    });
}
function main() {
    var element = makeHTML();
    chooseNumber();
    addEvent(element);
}
main();

const { body } = document;
let candidate: number[];
let tempArray: number[] = [];

function chooseNumber() {
  candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  tempArray = [];

  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    tempArray.push(chosen);
  }
}

function makeHTML(): [HTMLHeadingElement, HTMLFormElement, HTMLInputElement, HTMLButtonElement] {
  const result = document.createElement('h1');
  body.append(result);

  const form = document.createElement('form');
  body.append(form);

  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 4;
  form.append(input);

  const button = document.createElement('button');
  button.textContent = '입력';
  form.append(button);

  return [result, form, input, button];
}

function addEvent(element: [HTMLHeadingElement, HTMLFormElement, HTMLInputElement, HTMLButtonElement]) {
  const [result, form, input, button] = element;
  let wrongCount: number = 0;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const answer = input.value;
    
    if (answer === tempArray.join('')) {
      result.textContent = '홈런';
      input.value = '';
      input.focus();
      chooseNumber();
    }
    else {
      const answerArray = answer.split('');
      let strike: number = 0;
      let ball: number = 0;
      wrongCount += 1;

      if (wrongCount > 10) {
        result.textContent = `10번 넘게 틀려서 실패! 답은 ${tempArray.join(',')}였습니다.`;
        input.value = '';
        input.focus();
        chooseNumber();
        wrongCount = 0;
      }
      else {
        console.log('답이 틀리면', answerArray);
        for (let i = 0; i <= 3; i += 1) {
          if (Number(answerArray[i]) === tempArray[i]) {
            strike += 1;
          }
          else if (tempArray.indexOf(Number(answerArray[i])) > -1) {
            ball += 1;
          }
        }

        result.textContent = `${strike}스트라이크, ${ball}볼입니다.`;
        input.value = '';
        input.focus();
      }
    }
  });
}

function main() {
  const element = makeHTML();
  chooseNumber();
  addEvent(element);
}
main();
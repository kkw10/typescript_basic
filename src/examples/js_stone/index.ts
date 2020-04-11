// public     => 어디서든 접근 가능
// protected  => 해당 클래스 및 상속 클래스에서 접근 가능
// private    => 해당 클래스 내부에서만 접근 가능
// [TIP] : 처음에는 private으로 사용하다가 필요에 따라 권한을 넓혀주는 방식으로 사용한다.

interface Card {
  att: number;
  hp: number;
  mine: boolean;
  field: boolean;
  cost?: number;
  hero?: boolean;
}

class Hero implements Card {
  public att: number;
  public hp: number;
  public hero: boolean;
  public field: true;
  public mine: boolean;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
    this.field = true;
  }
};

class Sub implements Card {
  public att: number;
  public hp: number;
  public field: boolean = false;
  public mine: boolean;
  public cost: number;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
};

function isSub(data: Card): data is Sub {
  if (data.cost) {
    return true;
  }
  return false;
}

function isHero(data: Card): data is Hero {
  if (data.hero) {
    return true;
  }
  return false;
}

interface Player {
  hero: HTMLDivElement,
  deck: HTMLDivElement,
  field: HTMLDivElement,
  cost: HTMLDivElement,
  deckData: Card[],
  heroData?: Card | null,
  fieldData: Card[],
  chosenCard?: HTMLDivElement | null,
  chosenCardData?: Card | null,
};

const opponent: Player = {
  hero: document.getElementById('rival-hero') as HTMLDivElement,
  deck: document.getElementById('rival-deck') as HTMLDivElement,
  field: document.getElementById('rival-cards') as HTMLDivElement,
  cost: document.getElementById('rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const me: Player = {
  hero: document.getElementById('my-hero') as HTMLDivElement,
  deck: document.getElementById('my-deck') as HTMLDivElement,
  field: document.getElementById('my-cards') as HTMLDivElement,
  cost: document.getElementById('my-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
}

const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
let turn = true; // true => 내턴 , false => 상대턴

function initiate() {
  // 플레이어 초기화
  [opponent, me].forEach((i) => {
    i.deckData = [];
    i.heroData = null;
    i.fieldData = [];
    i.chosenCard = null;
    i.chosenCardData = null;
  });

  console.log("start");

  createDeck({ isMine: true, count: 5 });
  createDeck({ isMine: false, count: 5 });
  createHero({ isMine: true });
  createHero({ isMine: false });
  redrawScreen({ isMine: true });
  redrawScreen({ isMine: false });
}
initiate();

function createDeck({ isMine, count }: { isMine: boolean, count: number }) {
  const player = isMine ? me : opponent;
  for (let i: number = 0; i < count; i++) {
    player.deckData.push(new Sub(isMine));
  }
  redrawDeck(player);
};

function createHero({ isMine }: { isMine: boolean }) {
  const player = isMine ? me : opponent;
  player.heroData = new Hero(isMine);

  connectCardDataToDOM({
    data: player.heroData,
    dom: player.hero,
    hero: true,
  });
};

interface IconnectCardDataToDOM {
  data: Card,
  dom: HTMLDivElement,
  hero?: boolean,
}
function connectCardDataToDOM({ data, dom, hero = false }: IconnectCardDataToDOM) {
  const cardEl = document.querySelector('.card-hidden .card')!.cloneNode(true) as HTMLDivElement;
  cardEl.querySelector('.card-att')!.textContent = String(data.att);
  cardEl.querySelector('.card-hp')!.textContent = String(data.hp);

  if (hero) {
    (cardEl.querySelector('.card-cost') as HTMLDivElement).style.display = 'none';
    const name = document.createElement('div');
    name.textContent = '영웅';
    cardEl.appendChild(name);
  } else {
    cardEl.querySelector('.card-cost')!.textContent = String(data.cost);
  }

  cardEl.addEventListener('click', () => {
    if (
      isSub(data) &&
      data.mine === turn &&
      !data.field
    ) {
      if (!deckToField({ data })) {
        createDeck({ isMine: turn, count: 1 });
      }
    } 
  })

  dom.appendChild(cardEl);
};

function redrawScreen({ isMine }: { isMine: boolean }) {
  const player = isMine ? me : opponent;
  redrawHero(player);
};

function redrawHero(target: Player) {
  if (!target.heroData) {
    throw new Error('heroData가 없습니다.');
  }

  target.hero.innerHTML = '';
  connectCardDataToDOM({
    data: target.heroData,
    dom: target.hero,
    hero: true,
  });
};

function redrawDeck(target: Player) {
  target.deck.innerHTML = '';
  target.deckData.forEach((data) => {
    connectCardDataToDOM({
      data: data,
      dom: target.deck,
    });
  });
};

function redrawField(target: Player) {
  target.field.innerHTML = '';
  target.fieldData.forEach((data) => {
    connectCardDataToDOM({
      data: data,
      dom: target.field,
    });
  });
};

function deckToField({ data }: { data: Sub }): boolean {
  const target = turn ? me : opponent;
  const currentCost = Number(target.cost.textContent);

  if (currentCost < data.cost) {
    alert('코스트가 모자릅니다.');
    return true;
  }

  data.field = true;
  const idx = target.deckData.indexOf(data);
  target.deckData.splice(idx, 1);
  target.fieldData.push(data);
  redrawDeck(target);
  redrawField(target);
  target.cost.textContent = String(currentCost - data.cost);
  return false;
};




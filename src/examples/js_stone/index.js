"use strict";
// public     => 어디서든 접근 가능
// protected  => 해당 클래스 및 상속 클래스에서 접근 가능
// private    => 해당 클래스 내부에서만 접근 가능
// [TIP] : 처음에는 private으로 사용하다가 필요에 따라 권한을 넓혀주는 방식으로 사용한다.
var Hero = /** @class */ (function () {
    function Hero(mine) {
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    }
    return Hero;
}());
;
var Sub = /** @class */ (function () {
    function Sub(mine) {
        this.field = false;
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    return Sub;
}());
;
function isSub(data) {
    if (data.cost) {
        return true;
    }
    return false;
}
function isHero(data) {
    if (data.hero) {
        return true;
    }
    return false;
}
;
var opponent = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var turnButton = document.getElementById('turn-btn');
var turn = true; // true => 내턴 , false => 상대턴
function initiate() {
    // 플레이어 초기화
    [opponent, me].forEach(function (i) {
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
function createDeck(_a) {
    var isMine = _a.isMine, count = _a.count;
    var player = isMine ? me : opponent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new Sub(isMine));
    }
    redrawDeck(player);
}
;
function createHero(_a) {
    var isMine = _a.isMine;
    var player = isMine ? me : opponent;
    player.heroData = new Hero(isMine);
    connectCardDataToDOM({
        data: player.heroData,
        dom: player.hero,
        hero: true
    });
}
;
function connectCardDataToDOM(_a) {
    var data = _a.data, dom = _a.dom, _b = _a.hero, hero = _b === void 0 ? false : _b;
    var cardEl = document.querySelector('.card-hidden .card').cloneNode(true);
    cardEl.querySelector('.card-att').textContent = String(data.att);
    cardEl.querySelector('.card-hp').textContent = String(data.hp);
    if (hero) {
        cardEl.querySelector('.card-cost').style.display = 'none';
        var name_1 = document.createElement('div');
        name_1.textContent = '영웅';
        cardEl.appendChild(name_1);
    }
    else {
        cardEl.querySelector('.card-cost').textContent = String(data.cost);
    }
    cardEl.addEventListener('click', function () {
        if (isSub(data) &&
            data.mine === turn &&
            !data.field) {
            if (!deckToField({ data: data })) {
                createDeck({ isMine: turn, count: 1 });
            }
        }
    });
    dom.appendChild(cardEl);
}
;
function redrawScreen(_a) {
    var isMine = _a.isMine;
    var player = isMine ? me : opponent;
    redrawHero(player);
}
;
function redrawHero(target) {
    if (!target.heroData) {
        throw new Error('heroData가 없습니다.');
    }
    target.hero.innerHTML = '';
    connectCardDataToDOM({
        data: target.heroData,
        dom: target.hero,
        hero: true
    });
}
;
function redrawDeck(target) {
    target.deck.innerHTML = '';
    target.deckData.forEach(function (data) {
        connectCardDataToDOM({
            data: data,
            dom: target.deck
        });
    });
}
;
function redrawField(target) {
    target.field.innerHTML = '';
    target.fieldData.forEach(function (data) {
        connectCardDataToDOM({
            data: data,
            dom: target.field
        });
    });
}
;
function deckToField(_a) {
    var data = _a.data;
    var target = turn ? me : opponent;
    var currentCost = Number(target.cost.textContent);
    if (currentCost < data.cost) {
        alert('코스트가 모자릅니다.');
        return true;
    }
    data.field = true;
    var idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawDeck(target);
    redrawField(target);
    target.cost.textContent = String(currentCost - data.cost);
    return false;
}
;

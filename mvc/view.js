const view = (function () {
  let domElements = {
    wrapper: ".wrapper",

    //player1
    start_info1: ".start_info1",
    game_info1: ".game_info1",
    name1: ".name1",
    save1: ".save1",
    player1: ".player1",
    bank1: ".bank1",
    current1: ".current1",
    wins1:".wins1",

    //player2
    start_info2: ".start_info2",
    game_info2: ".game_info2",
    name2: ".name2",
    save2: ".save2",
    player2: ".player2",
    bank2: ".bank2",
    current2: ".current2",
    wins2:".wins2",

    //game related classes
    initial_roll: ".initial_roll",
    board: ".board",
    dice: ".dice",
    roll: ".roll",
    bank: ".bank",
    actions: ".actions",
    start: ".start",
    no_visibility: ".no_visibility",
    active: ".active",
  };

  let infoSpan = document.createElement("span");
  infoSpan.classList.add("initial_roll");
  document.querySelector(domElements.board).appendChild(infoSpan);

  const winner = (name) => {
    let html = `You are the winner ${name}, congratulations!!!`;
    infoSpan.textContent = html;
  };

  const bankInfoSpan = (bank, name) => {
    let html = `${name} just banked! He has ${bank} in the bank.`;
    infoSpan.textContent = html;
  };

  const infoSpanText = (name, counter, roll, current) => {
    let text = "";
    if (roll == 1 && counter > 2) {
      text = `You lost this bunch. Now it's ${name} turn. Better luck next time.`;

      //skini komentar sa ovoga da radi i za sesticu
    // } else if (roll == 6 && counter > 2) {
    //   text = `You lost 6 points from the bank ${name}, and your current state. And it's not even your turn anymore...`;
    } else {
      if (counter == 0) {
        text = `Roll to see who will play first. Start from ${name}!`;
      }
      if (counter == 1) {
        text = `Now ${name} roll!`;
      }
      if (counter == 2 && name != "tie") {
        text = `First will play ${name}. Good luck!`;
      }
      if (name == "tie") {
        text = `It's a tie, you have to throw again!`;
      }
      if (counter >= 3) {
        document
          .querySelector(domElements.bank)
          .classList.remove("no_visability");
        text = `${name} just rolled ${roll}. His current state is ${current}`;
      }
    }

    infoSpan.textContent = text;
  };

  return {
    getDomElements: () => {
      return domElements;
    },
    getInfo: (id) => {
      if (id == 1) {
        return {
          name: document.querySelector(domElements.name1).value,
        };
      }
      if (id == 2) {
        return {
          name: document.querySelector(domElements.name2).value,
        };
      }
      return "Something went wrong";
    },
    setUpPlayer: (info, id) => {
      let html = "";
      console.log(info);
      if (id == 1) {
        document.querySelector(domElements.start_info1).classList =
          "no_visability";
        html = `
            <span class="player1">Player: ${info[0]}</span>
            <span class="bank1">Your bank state:${info[1]}</span>
            <span class="current1">Amount available to bank:${info[2]}</span>
            <span class="wins1">Wins:${info[3]}</span>`;
        document.querySelector(domElements.game_info1).innerHTML = html;
      }
      if (id == 2) {
        document.querySelector(domElements.start_info2).classList =
          "no_visability";
        html = `
            <span class="player2">Player: ${info[0]}</span>
            <span class="bank2">Your bank state is:${info[1]}</span>
            <span class="current2">Amount available to bank:${info[2]}</span>
            <span class="wins2">Wins:${info[3]}</span>`;
        document.querySelector(domElements.game_info2).innerHTML = html;
      }
    },
    setUpStart: (name, counter) => {
      document.querySelector(domElements.start).classList.add("no_visability");
      document
        .querySelector(domElements.actions)
        .classList.remove("no_visability");
      infoSpanText(name, counter);
    },
    setDice: (updatedState, counter, diceRoll) => {
      document.querySelector(domElements.dice).src = updatedState[1];
      let current1 = document.querySelector(domElements.current1);
      let current2 = document.querySelector(domElements.current2);
      let bank1 = document.querySelector(domElements.bank1);
      let bank2 = document.querySelector(domElements.bank2);
      if (counter >= 3) {
        //updatedState will be array [playerName, dicepic, activePlayer, currentState]


         //skini komentar sa ovoga da radi i za sesticu
        // if (diceRoll == 6) {
        //   if (updatedState[2] == 1) {
        //     bank1.textContent = `Your bank state is:${updatedState[4]}`;
        //   } else {
        //     bank2.textContent = `Your bank state is:${updatedState[4]}`;
        //   }
        // }
        if (updatedState[2] == 1) {
          current2.textContent = `Amount available to bank: 0`;
          current1.textContent = `Amount available to bank: ${updatedState[3]}`;
        } else {
          current1.textContent = `Amount available to bank: 0`;
          current2.textContent = `Amount available to bank: ${updatedState[3]}`;
        }
        infoSpanText(updatedState[0], counter, diceRoll, updatedState[3]);
      } else {
        //updatedState will be array [playerName, dicepic]
        infoSpanText(updatedState[0], counter);
      }
    },
    setBank: (updateBank) => {
      //update bank [score.bank[activePlayer], names[activePlayer], activePlayer]
      let bank1 = document.querySelector(domElements.bank1);
      let bank2 = document.querySelector(domElements.bank2);
      let current1 = document.querySelector(domElements.current1);
      let current2 = document.querySelector(domElements.current2);
      if (updateBank[2] == 1) {
        bank1.textContent = `Your bank state is:${updateBank[0]}`;
        current1.textContent = `Amount available to bank: 0`;
      } else {
        bank2.textContent = `Your bank state is:${updateBank[0]}`;
        current2.textContent = `Amount available to bank: 0`;
      }
      bankInfoSpan(updateBank[0], updateBank[1]);
    },
    resetScore: () => {
      document.querySelector(domElements.bank1).textContent =
        "Your bank state is: 0";
      document.querySelector(domElements.bank2).textContent =
        "Your bank state is: 0";
      document.querySelector(domElements.current1).textContent =
        "Amount available to bank: 0";
      document.querySelector(domElements.current2).textContent =
        "Amount available to bank: 0";
    },
    winner: (info) => {
        //info [true, names[activePlayer], score.wins[activePlayer], activePlayer]
      winner(info[1]);
      console.log('win1')
      if(info[3]==1){
        document.querySelector(domElements.wins1).textContent=`Wins:${info[2]}`
        console.log('win2')

      }else{
        document.querySelector(domElements.wins2).textContent=`Wins:${info[2]}`
        console.log('win3')

      }
      console.log('win4')

      document
        .querySelector(domElements.actions)
        .classList.add("no_visability");
      document
        .querySelector(domElements.start)
        .classList.remove("no_visability");
    },
  };
})();

export default view;

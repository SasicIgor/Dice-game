const model = (function () {
  let dice = [
    "./dice/1.png",
    "./dice/2.png",
    "./dice/3.png",
    "./dice/4.png",
    "./dice/5.png",
    "./dice/6.png",
  ];

  let names = {
    1: "player 1",
    2: "player 2",
  };
  let score = {
    bank: {
      1: 0,
      2: 0,
    },
    current: {
      1: 0,
      2: 0,
    },
    wins: {
      1: 0,
      2: 0,
    },
  };

  let initialRoll = {
    1: 0,
    2: 0,
  };

  let activePlayer = 0;

  let getPhoto = (roll) => {
    return dice[roll - 1];
  };

  return {
    setName: (id, value) => {
      console.log(value);
      if (value.name != "") {
        names[id] = value.name;
      }
      return [names[id], score.bank[id], score.current[id], score.wins[id]];
    },
    getFirstPlayer: () => {
      return names[1];
    },

    setActivePlayer: (diceRoll, counter) => {
      const dice = getPhoto(diceRoll);
      console.log(activePlayer);
      if (counter == 1) {
        initialRoll[1] = diceRoll;
        return [names[2], dice];
      } else if (counter == 2) {
        initialRoll[2] = diceRoll;
        if (initialRoll[1] > initialRoll[2]) {
          activePlayer = 1;
          console.log(activePlayer);
          return [names[1], dice, activePlayer];
        } else if (initialRoll[1] < initialRoll[2]) {
          activePlayer = 2;
          console.log(activePlayer);
          return [names[2], dice, activePlayer];
        } else {
          return ["tie", dice];
        }
      }
      console.log(activePlayer);
    },
    addToCurrent: (diceRoll) => {
      const dice = getPhoto(diceRoll);
      if (diceRoll == 1) {
        if (activePlayer == 1) {
          score.current[activePlayer] = 0;
          activePlayer = 2;
        } else {
          score.current[activePlayer] = 0;
          activePlayer = 1;
        }
        return [
          names[activePlayer],
          dice,
          activePlayer,
          score.current[activePlayer],
        ];
        // skini komentar sa ovoga da radi i za sesticu
      // } else if (diceRoll == 6) {
      //   score.current[activePlayer] = 0;
      //   score.bank[activePlayer] -= 6;
      //   return [
      //     names[activePlayer],
      //     dice,
      //     activePlayer,
      //     score.current[activePlayer],
      //     score.bank[activePlayer],
      //   ];
      } else {
        score.current[activePlayer] += diceRoll;
        return [
          names[activePlayer],
          dice,
          activePlayer,
          score.current[activePlayer],
          
        ];
      }
    },
    addToBank: () => {
      score.bank[activePlayer] += score.current[activePlayer];
      score.current[activePlayer] = 0;
      console.log(score);
      return [score.bank[activePlayer], names[activePlayer], activePlayer];
    },
    changeActivePlayer: () => {
      if (activePlayer == 1) {
        activePlayer = 2;
      } else {
        activePlayer = 1;
      }
      return;
    },
    checkWinner: () => {
      if (score.bank[activePlayer] > 51) {
        score.wins[activePlayer]+=1;
        return [true, names[activePlayer], score.wins[activePlayer], activePlayer];
      }
      return [false];
    },
    resetScore: () => {
      score.bank[1] = 0;
      score.bank[2] = 0;
      score.current[1] = 0;
      score.current[2] = 0;
    },
  };
})();

export default model;

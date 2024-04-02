const controller = function (model, view) {
  let DOM = view.getDomElements();
  //counter for thea active player
  let counter = 0;
  let buttonListener = function () {
    document
      .querySelector(DOM.save1)
      .addEventListener("click", (e) => setInfo(e.target.id));
    document
      .querySelector(DOM.save2)
      .addEventListener("click", (e) => setInfo(e.target.id));
    document.querySelector(DOM.start).addEventListener("click", startGame);
    document.querySelector(".roll").addEventListener("click", rollDice);
    document.querySelector(DOM.bank).addEventListener("click", bankScore);
  };

  const setInfo = (id) => {
    let value = view.getInfo(id);
    let set = model.setName(id, value);
    view.setUpPlayer(set, id);
  };

  const startGame = () => {
    model.resetScore();
    view.resetScore();
    counter = 0;
    const firstPlayer = model.getFirstPlayer();
    view.setUpStart(firstPlayer, counter);
    counter++;
  };

  const rollDice = () => {
    const diceRoll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    if (counter < 2) {
      const updatedState = model.setActivePlayer(diceRoll, counter);
      view.setDice(updatedState, counter);
    } else if (counter == 2) {
      const updatedState = model.setActivePlayer(diceRoll, counter);
      view.setDice(updatedState, counter);
      if (updatedState[0] == "tie") {
        return (counter = 1);
      }
    } else if (counter >= 3) {
      const currentState = model.addToCurrent(diceRoll);
      view.setDice(currentState, counter, diceRoll);


      // if(diceRoll==6){
      //   model.changeActivePlayer();
      // }
    }
    counter++;
  };
  const bankScore = () => {
    const updateBank = model.addToBank();
    view.setBank(updateBank);
    const winner = model.checkWinner();
    console.log(winner);
    if (winner[0]) {
      return view.winner(winner);
    }
    model.changeActivePlayer();
  };

  return {
    init: function () {
      buttonListener();
    },
  };
};

export default controller;

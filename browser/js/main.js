/* global $ */
$(function () {

  function createListItem (text) {
    return $(`<li>${text}</li>`);
  }

  function addToList (list, text) {
    const newListItem = createListItem(text);
    list.append(newListItem);
  }

  const $gamesList = $('#games-list');

  (function fetchGames () {
    // const getAllGamesReq = new XMLHttpRequest();
    // getAllGamesReq.open('GET', '/api/games', true);
    // getAllGamesReq.onreadystatechange = function () {
      // if (getAllGamesReq.readyState === XMLHttpRequest.DONE && getAllGamesReq.status === 200) {
        // const games = JSON.parse(getAllGamesReq.response);
        // games.forEach(game => addToList($gamesList, game.name));
      // }
    // };
    // getAllGamesReq.send();

    $.ajax({
      method: 'GET',
      url: '/api/games'
    })
    .then(games => {
      games.forEach(game => addToList($gamesList, game.name));
    });
  })();

  // add a new game when the form is submitted
  $('#game-form').submit(function (event) {
    event.preventDefault();
    const $gameInput = $('#new-game');
    const newGameName = $gameInput.val();
    $gameInput.val('');

    // addToList($gamesList, newGameName);

    (function addGame () {
//       const createGameReq = new XMLHttpRequest();
//       createGameReq.open('POST', '/api/games', true);
//
//       createGameReq.setRequestHeader('Content-type', 'application/json');
//
//       createGameReq.onreadystatechange = function () {
//         if (createGameReq.readyState === XMLHttpRequest.DONE && createGameReq.status === 201) {
//           const resObj = JSON.parse(createGameReq.response);
//           const createdGameName = resObj.name;
//
//           addToList($gamesList, createdGameName);
//         }
//       };
//
//       createGameReq.send(JSON.stringify({ name: newGameName }));

      $.ajax({
        method: 'POST',
        url: '/api/games',
        data: {
          name: newGameName
        }
      })
      .then(game => addToList($gamesList, game.name))
    })();
  });

});

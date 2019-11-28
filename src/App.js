import React, { Component } from 'react';
import './App.css';
import Card from './components/card';
import Axios from 'axios';
import { DECK_OF_CARDS_API } from './constants';
import Buttons from './components/buttons/buttons';
import Turns from './components/turns/turns';

require('./App.css');

class App extends Component {
  state = {
    moves: 0,
    decks: [],
    gameStarted: false,
    firstDeckID: null,
    firstDeck: null,
    secondDeckID: null,
    secondDeck: null,
  };

  componentDidMount() {
    this.initializeDeck();
  }

  handleClick = (id) => {
    this.setState({ flipped: id });
  };

  initializeDeck = () => {
    Axios.get(`${DECK_OF_CARDS_API}new/draw/?count=9`).then((deckNewRes) => {
      Axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=' +
          deckNewRes.data.cards.map((card) => card.code).join()
      ).then((deckNewShuffleRes) => {
        Axios.get(
          'https://deckofcardsapi.com/api/deck/' +
            deckNewShuffleRes.data.deck_id +
            '/draw/?count=9'
        ).then((deckShuffleRes) => {
          deckNewRes.data.cards.forEach((card) => {
            card.isMatched = false;
            card.isVisible = false;
            card.isWrong = false;
          });
          deckShuffleRes.data.cards.forEach((card) => {
            card.isMatched = false;
            card.isVisible = false;
            card.isWrong = false;
          });

          this.setState({
            firstDeckID: deckNewRes.data.deck_id,
            firstDeck: deckNewRes.data.cards,
            secondDeckID: deckNewShuffleRes.data.deck_id,
            secondDeck: deckShuffleRes.data.cards,
          });
          let decks = [];
          decks.push({
            deck_id: this.state.firstDeckID,
            cards: this.state.firstDeck,
            selected: '',
          });
          decks.push({
            deck_id: this.state.secondDeckID,
            cards: this.state.secondDeck,
            selected: '',
          });
          this.setState({ decks, gameStarted: true, moves: 0 });
        });
      });
    });
  };

  onCardFlip = (deckIndex, cardIndex) => {
    let decks = this.onCardFlipOP(
      this.state.decks.slice(0),
      deckIndex,
      cardIndex
    );
    this.setState({ decks, moves: this.state.moves + 1 });
  };

  onCardFlipOP = (decks, deckIndex, cardIndex) => {
    let selectedDeck = decks[deckIndex];

    if (selectedDeck.selected !== '') {
      decks[deckIndex].cards[decks[deckIndex].selected].isVisible = false;
    }
    decks[deckIndex].selected = cardIndex;
    decks[deckIndex].cards[decks[deckIndex].selected].isVisible = true;
    return decks;
  };

  render() {
    return (
      <div className="main-container">
        <h2>Card Memory Game</h2>
        <div className="top-section">
          <Buttons
            loadFreshDeck={this.initializeDeck}
            gameStarted={this.state.gameStarted}
          ></Buttons>
          <Turns
            moves={this.state.moves}
            gameStarted={this.state.gameStarted}
          ></Turns>
        </div>
        {this.state.decks.map((deck) => {
          return (
            <div className="deck">
              <Card
                value={deck.cards[0]}
                onClick={this.onCardFlip.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  0
                )}
              />
              <Card
                value={deck.cards[1]}
                onClick={this.onCardFlip.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  1
                )}
              />
              <Card
                value={deck.cards[2]}
                onClick={this.onCardFlip.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  2
                )}
              />
              <Card
                value={deck.cards[3]}
                onClick={this.onCardFlip.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  3
                )}
              />
              <Card
                value={deck.cards[4]}
                onClick={this.onCardFlip.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  4
                )}
              />
              <Card
                value={deck.cards[5]}
                onClick={this.onCardFlip.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  5
                )}
              />
              <Card
                value={deck.cards[6]}
                onClick={this.onCardFlip.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  6
                )}
              />
              <Card
                value={deck.cards[7]}
                onClick={this.onCardFlip.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  7
                )}
              />
              <Card
                value={deck.cards[8]}
                onClick={this.onCardFlip.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  8
                )}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;

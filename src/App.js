import React, { Component } from 'react';
import './App.css';
import Card from './components/card';
import Axios from 'axios';
import Buttons from './components/buttons/buttons';
import Turns from './components/turns/turns';
require('./App.css');

class App extends Component {
  state = {
    moves: 0,
    decks: [],
    gameStarted: false,
  };

  componentDidMount() {
    this.initializeDeck();
  }

  initializeDeck = () => {
    Axios.get('http://localhost:5000/api/getDeckDataForPlay').then((res) => {
      let decks = [];
      decks.push({
        deck_id: res.data.firstDeckID,
        cards: res.data.firstDeck,
        selected: '',
      });
      decks.push({
        deck_id: res.data.secondDeckID,
        cards: res.data.secondDeck,
        selected: '',
      });
      this.setState({
        decks,
        gameStarted: true,
      });
    });
  };

  onCardClick = (deckIndex, cardIndex) => {
    let decks = this.onCardFlipOP(
      this.state.decks.slice(0),
      deckIndex,
      cardIndex
    );
    this.setState((prevState, props) => ({
      decks,
      moves: prevState.moves + 1,
    }));
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
                onClick={this.onCardClick.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  0
                )}
              />
              <Card
                value={deck.cards[1]}
                onClick={this.onCardClick.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  1
                )}
              />
              <Card
                value={deck.cards[2]}
                onClick={this.onCardClick.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  2
                )}
              />
              <Card
                value={deck.cards[3]}
                onClick={this.onCardClick.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  3
                )}
              />
              <Card
                value={deck.cards[4]}
                onClick={this.onCardClick.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  4
                )}
              />
              <Card
                value={deck.cards[5]}
                onClick={this.onCardClick.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  5
                )}
              />
              <Card
                value={deck.cards[6]}
                onClick={this.onCardClick.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  6
                )}
              />
              <Card
                value={deck.cards[7]}
                onClick={this.onCardClick.bind(
                  null,
                  this.state.decks.indexOf(deck),
                  7
                )}
              />
              <Card
                value={deck.cards[8]}
                onClick={this.onCardClick.bind(
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

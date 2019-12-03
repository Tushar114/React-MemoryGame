const express = require('express');
const axios = require('axios');
const app = express();
const url = 'https://deckofcardsapi.com';
const cors = require('cors');

app.use(cors());

app.get('/api/getDeckDataForPlay', async (req, res) => {
  try {
    const deckNewRes = await axios.get(`${url}/api/deck/new/draw/?count=9`);

    const cardCodes = deckNewRes.data.cards.map((card) => card.code);

    const deckNewShuffleRes = await axios.get(
      `${url}/api/deck/new/shuffle/?cards=${cardCodes}`
    );

    const deckShuffleRes = await axios.get(
      `${url}/api/deck/${deckNewShuffleRes.data.deck_id}/draw/?count=9`
    );

    deckNewRes.data.cards.map((card) => {
      card.isVisible = false;
      card.isWrong = false;
    });
    deckShuffleRes.data.cards.map((card) => {
      card.isVisible = false;
      card.isWrong = false;
    });
    res.send({
      firstDeckID: deckNewRes.data.deck_id,
      firstDeck: deckNewRes.data.cards,
      secondDeckID: deckNewShuffleRes.data.deck_id,
      secondDeck: deckShuffleRes.data.cards,
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

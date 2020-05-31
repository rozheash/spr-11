class CardList {
    constructor(container, cards) {
      this.container = container;
      this.cards = cards;
    }
  
    addCard(card) {
      this.container.appendChild(card.create());
      card.setEventListeners();
    }
  
    render() {
      this.cards.forEach(function(item) {
        this.addCard(item);
      }, this);
    }
}

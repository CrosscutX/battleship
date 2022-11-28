module.exports = { createShip: createShip };

function createShip(length) {
  return {
    length: length,
    hits: 0,
    sunk: false,

    hit() {
      this.hits++;
    },
    isSunk() {
      this.sunk = true;
    },
  };
}

const newShip = createShip(5);
newShip.hit();
newShip.isSunk();
console.log(newShip);

'use strict';

class HashMap {
  constructor(initialCapacity=15) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
    
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }


  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    for (let i=start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      //open addressing
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      } 
    }

  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    //if the slot value is not empty, find next available slot to find empty slot
    this._slots[index] = {
      key, 
      value,
      deleted: false
    };
    this.length++;

  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for(const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

let lor = new HashMap;

lor.set('Hobbit', 'Bilbo');
lor.set('Hobbit2', 'Frodo');
lor.set('Wizard', 'Gandolf');
lor.set('Human', 'Aragon');
lor.set('Elf', 'Legolas');
lor.set('Maiar', 'The Necromancer');
lor.set('Maiar2', 'Sauron');
lor.set('RingBearer', 'Gollum');
lor.set('LadyOfLight', 'Galadriel');
lor.set('HalfElven', 'Arwen');
lor.set('Ent', 'Treebeard');

// console.log(lor.get('Maiar'));
// console.log('Lor hashmap>>', lor._slots);
// console.log('Lor slot Hobbit>>', lor._findSlot('Hobbit'));
// console.log(lor);

let _string = new HashMap;

function palindrome(string){
  for (let i=0; i < string.length; i++){
    _string.set(i, string[i]);
    _string.get(i);
    string[i] === string[i];
  }
}

palindrome('racecar');
'use strict';

class HashMap {
  constructor(initialCapacity=15) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
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
    for (let i=start; i < start.length; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key === key) {
        return index;
      } 
    }

  }

  set(key, value) {
    const loadRatio = (this.length + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    //if the slot is not undefined, _findSlot(key) to find empty slot
    this._slots[index] = {
      key, 
      value
    };
    this.length++;
  }


}

let lor = new HashMap;
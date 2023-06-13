/* eslint-disable jest/valid-expect */
import { add } from '../Components/App/App';
import React from "react";
import chai, {assert, expect} from "chai";





describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Sum of 2 + 2', () => {
  it('should equal to 4.', () => {
   expect(add(2,2)).to.equal(4)
  })
})


import { IsMeatIncludedPipe } from './is-meat-included.pipe';

describe('IsMeatIncludedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsMeatIncludedPipe();
    expect(pipe).toBeTruthy();
  });
});

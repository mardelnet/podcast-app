import { dataIsLoadingSlice, isLoading } from '../loadingSlice';
const { reducer } = dataIsLoadingSlice;

describe('dataIsLoadingSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {
      type: ''
    })).toEqual({ loading: true });
  });

  it('should handle isLoading action', () => {
    expect(reducer({ loading: true }, isLoading(false))).toEqual({ loading: false });
    expect(reducer({ loading: false }, isLoading(true))).toEqual({ loading: true });
  });
});

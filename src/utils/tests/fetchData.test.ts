import { getLocalStorageData, storeData } from '../fetchData';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock fetch
const fetchMock = jest.fn();

beforeEach(() => {
  fetchMock.mockClear();
  localStorage.clear();
});

describe('getLocalStorageData', () => {
  it('should return cached data if not expired', () => {
    const data = { key: 'value' };
    storeData('testData', data);
    const cachedData = getLocalStorageData('testData');
    expect(cachedData).toEqual(data);
  });

  it('should return null if data is expired', () => {
    const data = { key: 'value' };
    storeData('testData', data);
    // Simulate expiration by setting a timestamp in the past
    localStorage.setItem('testData', JSON.stringify({ timestamp: 0, data }));
    const cachedData = getLocalStorageData('testData');
    expect(cachedData).toBeNull();
  });

  it('should return null if no data stored', () => {
    const cachedData = getLocalStorageData('nonExistentData');
    expect(cachedData).toBeNull();
  });
});

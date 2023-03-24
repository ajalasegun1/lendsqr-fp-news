export default () => ({
  setDefaults: jest.fn().mockResolvedValue(true),
  fetchAndActivate: jest.fn(),
  getValue: jest.fn().mockResolvedValue(true),
  asBoolean: jest.fn(),
});

const fakeDelay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default fakeDelay;

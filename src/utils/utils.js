const formStatusState = {
  Success: 'success',
  Error: 'error',
  Sending: 'sending',
  Idle: 'idle',
};

const getFeedsLinks = (state) => state.feeds.map((feed) => feed.linkName);

export { getFeedsLinks, formStatusState };

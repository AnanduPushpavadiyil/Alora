const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
};

const statusTypes = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
};

const transactionTypes = {
  TRANSFER: 'transfer',
  LIST: 'list',
  BUY: 'buy',
  MINT: 'mint',
  REMOVE: 'remove',
};

const mediaTypes = {
  IMAGE: 'image',
  VIDEO: 'video',
  MODELS_3D: '3d',
};

module.exports = {
  tokenTypes,
  statusTypes,
  transactionTypes,
  mediaTypes,
};
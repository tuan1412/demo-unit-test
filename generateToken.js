async function delay(ms) {
  return new Promise(rs => setTimeout(rs, ms));
}

async function generateToken() {
  await delay(3000);
  return 'token_test';
}

module.exports = generateToken;

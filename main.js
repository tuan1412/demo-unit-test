const app = require('./app');

async function main() {
  app.listen(9000, (err) => {
    if (err) {
      console.log('Server error', err);
    } else {
      console.log('Server started');
    }
  });
}

main();

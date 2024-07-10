const bcrypt = require('bcrypt');

async function generateHash(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
  } catch (error) {
    console.error(error);
  }
}

// Gera o hash para a senha "123456"
generateHash('123456');

const fs = require('fs').promises;

const getStats = async (path) => {
  try {
    const stats = await fs.stat(path);
    console.log('stats: ', stats);
    console.log('isFile: ', stats.isFile());
    console.log('isDirectory: ', stats.isDirectory());
  } catch (error) {
    console.log("getStats error: ", error);
  }
}

// getStats("./test.txt");

const readFile = async (path) => {
  try {
    const contents = await fs.readFile(path, 'utf-8');
    console.log('contents: ', contents);
  } catch (error) {
    console.log("readFile error: ", error)
  }
}

// readFile('./test.txt');

const writeFile = async (path, content) => {
  try {
    await fs.writeFile(path, content);
  } catch (error) {
    console.log("writeFile error: ", error)
  }
}

// readFile('./test.txt');
// writeFile('./test.txt', "artem");

const appendFile = async (path, content) => {
  try {
    await fs.appendFile(path, content)
  } catch (error) {
    console.log("appendFile error: ", error)
  }
}

appendFile("./test.txt", " appending another artem")
readFile("./test.txt")
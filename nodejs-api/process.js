const name = process.argv[2];
const location = process.argv[3];
console.log("process: ", process.argv);
console.log("name: ", name);
console.log("location: ", location);
// node process.js Artem Khariv

console.log('envs: ', process.env.NODE_ENV);

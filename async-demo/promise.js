let pro1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("It's Resolved 1");
    reject(new Error("It's Not Resolved 1"));
  },2000);
});

let pro2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("It's Resolved 2");
    reject(new Error("It's Not Resolved 2"));
  },2000);
});

Promise.race([pro1,pro2])
  .then((res)=> console.log("Result", res))
  .catch((err)=> console.log("Error", err.message))

export class Test {
  constructor(text) {
    this.text = text;
  }

  output() {
    console.log("test from class");
  }

  static asynchron() {
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(json => console.log(json));
  }
}

export default new Test("test class from module");

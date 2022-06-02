const readWriteFile = require("../helpers/readWriteFile");

let user = readWriteFile.readFile()
console.log(`The user name: ${user.name}, email: ${user.email}, password: ${user.password}`)

readWriteFile.writeFile("Emanuel", "emanuel@test.com", "Test1234")

user = readWriteFile.readFile()
console.log(`The user name: ${user.name}, email: ${user.email}, password: ${user.password}`)
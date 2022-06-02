const fs = require("fs");

function writeFile(name, email, password) {
    const user = {"name": name, "email": email, "password": password}
    try {
        fs.writeFileSync("users.json", JSON.stringify(user));
    }
    catch(error){
        console.log("Error on writing file: " + error);
    }
}

function readFile() {
    
    try {
        const user = fs.readFileSync("users.json", {encoding:'utf8', flag:'r'});
        jsonUser = JSON.parse(user)
        return jsonUser
    }
    catch(error){
        console.log("Error on reading file: " + error);
    }
}
readFile()
module.exports = {writeFile, readFile}
const fs = require('fs');

try {

    const data = fs.readFileAsync('nonexistentFile.txt')

    console.log('File content:', data);

} catch (error) {

    console.log("An error occurred", error.message);
}


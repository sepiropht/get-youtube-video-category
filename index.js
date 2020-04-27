const getCategory = require('./lib')

const videoUrl = process.argv[2]

getCategory(videoUrl).then(category => console.log(category))
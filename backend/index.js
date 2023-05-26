const elasticClient = require('./elastic-cleint')

const createIndex = async (index) => {
    await elasticClient.indices.create({ index })
    console.log(index)
}

createIndex("watson-intent-v2")
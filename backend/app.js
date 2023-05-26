const express = require('express')
const bodyParser = require('body-parser')
const elasticClient = require('./elastic-cleint')
//const films= require('./film.json')
const cors = require('cors')
require("express-async-errors");
const port = process.env.PORT || 8081
const app = express()
//const jsonData = require('./output.json')
const deeplinkData = require('./deeplink.json')
const faq_data = require('./faq-article.json')
app.use(bodyParser.json())
const index = "watson-intent"
const faqIndex = "faq-articles"
const { handler } = require('./handler')
// const indexV2 = "watson-intent-v2"
// const deepLinkIndex = "deeplink-index"
app.use(cors())
require('dotenv').config({ path: '.elastic.env' })
// app.post('/bulk', async (req, res) => {
//     try {
//         const result = await elasticClient.bulk({
//             body: handler.documentCreation(faq_data, process.env.FAQ_INDEX)
//         })
//         res.send(result)
//     } catch (err) {
//         console.error(err)
//     }

// })
// app.post('/create-post', async (req, res) => {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     const result = await elasticClient.index({
//         index,
//         document: {
//             ...req.body

//         }
//     })
//     res.send(result)
// })

// app.post('/create-articles', async (req, res) => {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     const result = await elasticClient.index({
//         index: faqIndex,
//         document: {
//             ...req.body

//         }
//     })
//     res.send(result)
// })

//search deeplink
const searchDeeplink = async (query) => {
    try {
        const result = await elasticClient.search({
            index: process.env.DEEPLINK_INDEX,
            query: {
                fuzzy: {
                    feature: query
                }
            }
        })
        if (!result.hits.hits.length) return []
        return result.hits.hits.slice(0, 2)
    } catch (error) {
        throw new Error(error)
    }

}

const searchIntent = async (query) => {
    try {
        const settings = {
            "index": process.env.WATSON_INDEX,
            "query": {
                "match": {
                    "intent": `${query}`

                }
            }
        }
        JSON.s
        const result = await elasticClient.search(settings)
        if (!result.hits.hits.length) return []
        return result.hits.hits.slice(0, 3)
    } catch (err) {
        throw new Error(err)
    }
}

const searchArticle = async (query) => {
    try {

        const result = await elasticClient.search({
            index: process.env.FAQ_INDEX,
            query: {
                fuzzy: {
                    label: query
                }
            }
        })
        if (!result.hits.hits.length) return []
        return result.hits.hits.slice(0, 3)
    } catch (err) {
        throw new Error(err)
    }
}
// app.get('/search-deeplink', async (req, res) => {
//     try {
//         const result = await elasticClient.search({
//             index: process.env.DEEPLINK_INDEX,
//             query: {
//                 fuzzy: {
//                     feature: req.query.feature
//                 }
//             }
//         })
//         if (!result.hits.hits.length) return res.status(404).send([])
//         res.send([result.hits.hits.slice(0, 2)])
//     } catch (error) {
//         res.status(500).send({ message: "internal error", error })
//     }
// })


// app.get('/search-intent', async (req, res) => {
//     try {
//         const settings = {
//             "index": process.env.WATSON_INDEX,
//             "query": {
//                 "match": {
//                     "intent": req.query.query
//                 }
//             }
//         }

//         const result = await elasticClient.search(settings)
//         if (!result.hits.hits.length) return res.status(404).send([])
//         res.send(result.hits.hits.slice(0, 3))
//     } catch (err) {
//         res.status(500).send({ message: err })
//     }
// })

// app.get('/search-article', async (req, res) => {
//     try {

//         const result = await elasticClient.search({
//             index: process.env.FAQ_INDEX,
//             query: {
//                 fuzzy: {
//                     label: req.query.query
//                 }
//             }
//         })
//         if (!result.hits.hits.length) return res.status(404).send([])
//         res.send(result.hits.hits.slice(0, 3))
//     } catch (err) {
//         res.status(500).send({ message: err })
//     }
// })

app.get('/search', async (req, res) => {
    try {
        const resutlObj = {
            support: await searchIntent(req.query.query),
            articles: await searchArticle(req.query.query),
            deeplink: await searchDeeplink(req.query.query)
        }
        res.send(resutlObj)
    } catch (err) {
        res.status(500).send(err)
    }

})
// app.delete('/remove-post', async (req, res) => {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     const result = await elasticClient.indices.delete({
//         index: req.query.index,
//         // id: req.query.id
//     })
//     res.send(result)
// })


// app.get('/search', async (req, res) => {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     const result = await elasticClient.search({
//         index,
//         query: {
//             fuzzy: {
//                 intent: req.query.query
//             }
//         }
//     })
//     res.send(result)
// })

// app.get('/posts', async (req, res) => {

//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     try {
//         const result = await elasticClient.search({
//             index,
//             query: { match_all: {} }
//         })
//         res.send(result)
//     } catch (err) {
//         res.send([])
//     }
// })

app.put('/add-field', async (req, res) => {
    try {
        const putQuery = {
            "index": process.env.WATSON_INDEX,
            "mappings": {
                "properties": {
                    "intent": {
                        "type": "search_as_you_type"
                    }
                }
            }
        }
        const result = await elasticClient.update(putQuery)
        res.send(result)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log(`listen to ${port}`)
})
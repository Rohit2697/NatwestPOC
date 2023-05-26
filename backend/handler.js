const handler = {};
handler.documentCreation = (jsonData,indexToSet) => {
    const documents = []
    jsonData.forEach((data, index) => {
        documents.push(
            { index: { _index: indexToSet } },
            data
        );
    });
    return documents
}



module.exports = { handler }
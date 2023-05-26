import React, { } from 'react'
//import articles from './faq-article.json'
export default function HelpArticles({ articles, setReturnData }) {


    // const filterArticles = (articles) => {
    //     const articleArr = []
    //     articles.forEach(element => {
    //         articleArr.push(...element.articles)
    //     });
    //     return articleArr
    // }
    const openArticle = (e, link) => {
        e.preventDefault()
        setReturnData({
            source: "Help Articles",
            metadata: link
        })
        window.open(link)
    }
    // let faqArticles = filterArticles(articles);

    // else if (faqArticles.length == lastIndex) {
    //     setDisabled(true)

    // }

    return (
        <div className='container'>
            <p className='text-sm-start' style={{ margin: "0", fontWeight: "700" }}>Help Articles</p>
            {articles.map((article, index) => {
                return (<div className='row bg-light' key={`article_${index}`}>
                    <button onClick={(e) => openArticle(e, article._source.link)} className="col list-group-item list-group-item-action">{article._source.label}</button>
                </div>)
            })}

        </div>
    )
}

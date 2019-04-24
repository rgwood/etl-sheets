import Link from 'next/link'
import { useState, useEffect } from 'react';
import { getRecentArticleHeaders } from '../services/data.service';
import { ArticleHeaderModel } from '../models/article'

const numberOfRecentArticlesToFetch = 4;

function RecentArticles() {
    var [recentArticles, setRecentArticles] = useState<ArticleHeaderModel[]>([]);
    useEffect(() => {
        getRecentArticleHeaders(numberOfRecentArticlesToFetch).then(result => { setRecentArticles(result) })
    }, []);
    return <div>
        <span className="font-bold">Recent Articles</span>
        <ul>
            {
                recentArticles.map((a) =>
                    <li key={a.id}>
                        <Link href={`/article?id=${a.id}`}>
                            <a>{a.name}</a>
                        </Link>
                    </li>
                )
            }
        </ul>
    </div>
}
export default RecentArticles;
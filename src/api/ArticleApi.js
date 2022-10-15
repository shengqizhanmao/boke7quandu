export function getArticles2api(page, pagesize) {
    return req({
        url: '/articles/getArticleByUserId/' + page.toString() + "/" + pagesize.toString(),
        method: 'GET',
    })
    this.$http.get('/articles/getArticleByUserId/' + page.toString() + "/" + pagesize.toString());
}
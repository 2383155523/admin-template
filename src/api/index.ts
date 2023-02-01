import req from "@/http"
/***
 * 示例一
 */
export interface addArticle_interface {
  title: string
  content: string
  addTime: string
  tag: string
  classify: string
  isPublishState: number
  articleHeaderImg: string
}
export const addArticle = async (data: addArticle_interface) => {
  const { res, err, isSuccess } = await req({
    method: "post",
    url: "/addArticle",
    data,
  })
  return isSuccess ? Promise.resolve(res) : Promise.reject(err)
}

export interface getArticle_interface {
  article_id: number
  article_title: string
  article_addTime: string
  article_readNum: number
  hasCommentTotal: number
  article_content: string
  article_classify: string
  article_isPublishState: number
  article_tag: string
  article_headerImg: string
}
/***
 * 示例二
 */
export const getArticle = async (data?: { id?: number }) => {
  const { res, err, isSuccess } = await req<Array<getArticle_interface>>({
    method: "get",
    url: "/getArticle",
    params: data,
  })

  return isSuccess ? Promise.resolve(res) : Promise.reject(err)
}

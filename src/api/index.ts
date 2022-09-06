import req from "@/http"

//请求示例
export const addArticle = async (data: { name: string; age: number }) => {
  const res = await req({
    method: "post",
    url: "/addArticle",
    data,
  })
  return res
}

export const getArticle = async () => {
  const res = await req({
    method: "get",
    url: "/getArticle",
  })
  return res
}

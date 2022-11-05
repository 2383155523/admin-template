import req from "@/http"

//请求示例
export const addArticle = async (data: { name: string; age: number }) => {
  const { res, err, isError, isSuccess } = await req({
    method: "post",
    url: "/addArticle",
    data,
  })
  return res
}

export const getArticle = async () => {
  const { res, err, isError, isSuccess } = await req({
    method: "get",
    url: "/getArticle",
    params: {},
  })
  return res
}

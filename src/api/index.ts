import req from '@/http'
export interface LoginDto {
  qq: string
  password: string
}

export const login = async (data: LoginDto) => {
  const { res, err, isSuccess } = await req<string>({
    method: 'post',
    url: '/login',
    data,
  })
  return isSuccess ? res : err
}

export interface Category {
  category_id: number
  category_name: string
}

export const getAllCategroy = async () => {
  const { res, err, isSuccess } = await req<Array<Category>>({
    method: 'get',
    url: '/category/list',
  })
  return isSuccess ? res : err
}

export const upload = async (data: FormData, config) => {
  const { res, err, isSuccess } = await req<{
    destination: string
    encoding: string
    fieldname: string
    filename: string
    mimetype: string
    originalname: string
    path: string
    size: number
    url: string
  }>({
    method: 'post',
    url: '/upload',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  })
  return isSuccess ? res : err
}

import type { Input, Options } from 'ky'
import ky from 'ky'

export const apiURL = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`

const config: Options = {
  prefixUrl: apiURL,
  retry: {
    limit: 0,
  },
}

export const http = ky.create({
  ...config,
  hooks: {
    beforeError: [
      async error => {
        // const errorRequestUrl = new URL(error.request.url)
        return error
      },
    ],
  },
})

const {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
} = http

const get = (url: Input, options?: Options) =>
  httpGet(url, {
    credentials: 'include',
    ...options,
  })
const post = (url: Input, options?: Options) =>
  httpPost(url, {
    credentials: 'include',
    ...options,
  })
const put = (url: Input, options?: Options) =>
  httpPut(url, {
    credentials: 'include',
    ...options,
  })
const patch = (url: Input, options?: Options) =>
  httpPatch(url, {
    credentials: 'include',
    ...options,
  })
const destroy = (url: Input, options?: Options) =>
  httpDelete(url, {
    credentials: 'include',
    ...options,
  })

export { destroy, get, patch, post, put }

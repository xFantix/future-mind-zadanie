import type { Input, Options } from 'ky'
import ky from 'ky'
import { toast } from 'sonner'

export const apiURL = `http://www.omdbapi.com/`

const config: Options = {
  prefixUrl: apiURL,
  retry: {
    limit: 0,
  },
}

export const http = ky.create({
  ...config,
  searchParams: {
    apikey: import.meta.env.VITE_OMDB_API_KEY,
  },
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const data = await response.json()
        if (
          (data as { Response: string; Error: string }).Response === 'False'
        ) {
          toast.error((data as { Error: string }).Error)
          throw new Error('Error fetching data')
        }
      },
    ],
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
    ...options,
  })
const post = (url: Input, options?: Options) =>
  httpPost(url, {
    ...options,
  })
const put = (url: Input, options?: Options) =>
  httpPut(url, {
    ...options,
  })
const patch = (url: Input, options?: Options) =>
  httpPatch(url, {
    ...options,
  })
const destroy = (url: Input, options?: Options) =>
  httpDelete(url, {
    ...options,
  })

export { destroy, get, patch, post, put }

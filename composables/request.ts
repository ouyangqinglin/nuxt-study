import type { LocationQuery } from 'vue-router';
import type { NitroFetchRequest } from 'nitropack';
import type { FetchOptions } from 'ofetch';

interface Params {
    url: NitroFetchRequest;
    params: FetchOptions<any>;
    method?: 'get' | 'post';
}

export async function getFetchData({ url, params, method = 'get' }: Params) {
    // 接口传参要求
    interface QueryItem {
        uid?: string;
        token?: LocationQuery
    }
    const toast = useToast()
    const route = useRoute()
    const query: QueryItem = route.query

    const config = useRuntimeConfig()
    console.log('config', config)
    const token = useCookie('token')
    const headers = {}
    if (token.value) headers['Authorization'] = 'Bearer ' + token.value['token']
    const { data } = await useFetch(url, {
        baseURL: config.public.apiBase,
        method,
        params: method === 'post' ? undefined : {...params},
        headers,
        credentials: 'include',
        body: method === 'post' ? JSON.stringify(params) : undefined,
        // onRequest请求拦截
        onRequest({ request, options }) {},
        onRequestError({ request, options, error }) {
            // 处理请求错误
            toast.add({ title: error as unknown as string })
            console.warn('request error', error);
        },
        // onResponse响应拦截
        onResponse({ response }) {},
        onResponseError({ request, response, options }) {
            // 处理响应错误
            toast.add({ title: response as unknown as string })
            console.warn('request error', response);
        },
    })
    // 这里data本身是个ref对象，将其内部值抛出去方便调用时获得数据。
    return data.value
}

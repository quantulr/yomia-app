import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(response => response.json())

export const usePosts = () => {
    const {data, isLoading, error} = useSWR('/api/posts', fetcher)
    return {
        posts: data,
        isLoading,
        isError: error
    }
}
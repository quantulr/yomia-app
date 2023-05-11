import useSWR from "swr";
import {Post} from "../types/post.ts";

const fetcher = (url: string) => fetch(url).then(response => response.json())

export const usePosts = (): { posts: Post[], isLoading: boolean, isError: any } => {
    const {data, isLoading, error} = useSWR('/api/posts', fetcher)
    return {
        posts: data,
        isLoading,
        isError: error
    }
}
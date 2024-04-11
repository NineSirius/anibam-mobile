import axios, { AxiosResponse } from 'axios'
import { TitleT } from '../types/TitleT'

const anibamApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
})

export const getTitlesUpdates = async () => {
    const data = await anibamApi.get('title/updates')
    return data
}
export const getTitleByCode = async (
    code: string,
): Promise<AxiosResponse<TitleT>> => {
    const data = await anibamApi.get(`title?code=${code}`)
    return data
}

export const getTitlesBySeason = async (
    currentYear: string,
    currentSeason: string,
) => {
    const data = await anibamApi.get(
        `title/search?year=${currentYear}&season_code=${currentSeason}&items_per_page=10`,
    )
    return data
}

export const getTitleBySearch = async (query?: string) => {
    const data = await anibamApi.get(`title/search?search=${query}`)
    return data
}

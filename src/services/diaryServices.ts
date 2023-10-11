import diaryData from './diaries.json'
import { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDairyEntry } from '../types'

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>

export const getEntries = () => diaryData

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id)
    if(entry) {
        const {comment, ...rest} = entry
        return rest
    }
    return undefined
}

export const getEntriesWithoutSensitiveInfo = () :  Array<NonSensitiveInfoDiaryEntry> => {
    return diaries.map(({ id, date, weather, visibility }) => {
        return {
            id,
            date,
            weather,
            visibility
        }
    })
}

export const addEntry = (newDairyEntry: NewDairyEntry) : DiaryEntry => {
    const newDiary = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...newDairyEntry
    }

    diaries.push(newDiary)
    return newDiary
}

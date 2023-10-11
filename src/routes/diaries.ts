import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDairyEntry from '../utils';

const router = express.Router()

router.get('/' , (_, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo())
});

router.get('/:id', (req, res) => {
    const diary = diaryServices.findById(Number(req.params.id))
    res.send(diary)
});

router.post('/', (req, res) => {
    try {
        const newDairyEntry = toNewDairyEntry(req.body)
    
        const addedDairyEntry = diaryServices.addEntry(newDairyEntry);

        res.json(addedDairyEntry)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
})

export default router
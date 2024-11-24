import express from 'express';
import trendsAPI from "google-trends-api"
const router = express.Router();

router.get("/trends", async (req, res) => {
    try {
        const {keyword} = req.query;
        const result = await trendsAPI.interestByRegion({keyword, resolution: 'CITY', startTime: new Date("2024-01-01"), endTime: new Date("2024-10-25")})
        console.log({result})
        return res.json({ success: true, data: JSON.parse(result) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching trends" });
    }
})

export default router;
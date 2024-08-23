import express from 'express'
import { verifyToken } from '../jsonwebtoken.js'
import { createSubscription, getSubscriptions, unsubscribe } from '../controllers/subscriptions.js'

const router = express.Router()

router.post("/subscribe/:userId", verifyToken, createSubscription)
router.post("/unsubscribe", verifyToken, unsubscribe)

export default router
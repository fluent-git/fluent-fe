// URL
export const baseUrl = 'https://api.fluent.id'
export const checkUrl = baseUrl+'/queue/check/'
export const queueUrl = baseUrl+'/queue/start/'
export const cancelUrl = baseUrl+'/queue/cancel/'
export const startTalkUrl = baseUrl+'/talk/start/'
export const endTalkUrl = baseUrl+'/talk/end/'

// talk status 
export const queued = "queued"
export const notQueued = "notQueued"
export const connected = "connected"
export const minimumCallTimeForReview = 60
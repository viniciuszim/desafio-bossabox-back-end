const kue = require('kue')
const Sentry = require('@sentry/node')
const redisConfig = require('../../config/redis')
const jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(jobs.NewToolMail.key, jobs.NewToolMail.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue

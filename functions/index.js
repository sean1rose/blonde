const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const search = require('./lib/search')
const subscriptions = require('./lib/subscriptions')
const users = require('./lib/users')

exports.updatePostInSearchIndex = functions.firestore
  .document('posts/{postId}')
  .onWrite(search.updatePostInSearchIndex)

exports.updateStripeSubscription = functions.firestore
  .document('subscriptions/{subscriptionId}')
  .onWrite(subscriptions.updateStripeSubscription)

exports.createUser = functions.auth.user()
  .onCreate(users.createUser)

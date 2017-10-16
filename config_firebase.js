import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCxkNxMQlioVzzUhy7s7-2Q44_UjVWUR2E",
    authDomain: "chat-5fb009008.firebaseapp.com",
    databaseURL: "https://chat-5fb009008.firebaseio.com",
    projectId: "chat-5fb009008",
    storageBucket: "chat-5fb009008.appspot.com",
    messagingSenderId: "473086010169"
};
const _app = firebase.initializeApp(config);
const _auth = _app.auth()
const _database = _app.database().ref()

const app = { auth: _auth, database: _database }
export default app
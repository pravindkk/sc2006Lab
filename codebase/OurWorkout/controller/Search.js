import { firebase } from '../config'
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import elasticlunr from "../node_modules/elasticlunr/release/elasticlunr"

/**
 * @param {{nameStart: string, emailStart: string}} searchObj 
 * @param {[string]} searchObj.tags
 * @param {number} limit 
 * @param {QuerySnapshot} afterSnapshot
 * @returns 
 */

elasticlunr.clearStopWords();
let alreadySetup = false;
let unsubscribe = _ => _;
const index = elasticlunr(function () {
    this.addField('name');
    this.addField('email');
    this.addField('tags');
    this.addField('uuid');
    this.setRef('id');
});
const docs_store = [];

const hashCode = function(that) {
    var hash = 0,
      i, chr;
    if (that.length === 0) return hash;
    for (i = 0; i < that.length; i++) {
      chr = that.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.round(hash);
  }

async function setup_lunr(docs)
{
    if (unsubscribe) unsubscribe();

    let query = firebase.firestore().collection('users');
    const unsubscribe = await onSnapshot(query, (snapshot) => {
        snapshot.docChanges().forEach((change) =>
        {
            if (change.type === "added") {
                let data = change.doc.data();
                let to_be_added = {
                    "id": docs_store.length,
                    "uuid": data.internalUuid,
                    "name": data.firstName + ' ' + data.lastName,
                    "email": data.email || data.userEmail,
                    "tags": data.userDetails ? data.userDetails.tags : "undefined"
                };
                docs_store.push(to_be_added);
                index.addDoc(docs_store[docs_store.length-1]);                
            } 
        });
    });
    alreadySetup = true;
}

export async function searchUsers(searchObj, limit, afterSnapshot)
{
    if (!alreadySetup)
        await setup_lunr();

    if (!searchObj.nameStart && !searchObj.emailStart && !searchObj.tags)
        return;
    if (!limit)
        limit = 10;
    
    let our_return = index.search([
        searchObj.nameStart,
        searchObj.emailStart,
        searchObj.tags ? searchObj.tags.join(" ") : ""
    ].join(""), {expand: true});
    
    //return our_return;
    return our_return.map(_ => docs_store[parseInt(_["ref"])]);
}

/**
 * @param {{nameStart: string, creatorUuid: string}} searchObj 
 * @param {number} limit 
 * @param {QuerySnapshot} afterSnapshot
 * @returns 
 */
export async function searchChats(searchObj, limit, afterSnapshot)
{
    if (!searchObj.nameStart && !searchObj.creatorUuid)
        return;
    if (!limit)
        limit = 10;
    let query = firebase.firestore().collection('chats');
    if (searchObj.nameStart)
        query = query
            .where('nameAkaTitle', '>=', searchObj.nameStart)
            .where('nameAkaTitle', '<=', searchObj.nameStart + '\uf8ff');
    if (searchObj.creatorUuid)
        query = query
            .where('creator', '>=', searchObj.creatorUuid)
            .where('creator', '<=', searchObj.creatorUuid + '\uf8ff');
    if (afterSnapshot)
        query = query.startAfter(afterSnapshot);
    query = query.limit(limit);
    return getDocs(query)
        .catch(_ => alert(_));
}

/**
 * @param {{nameStart: string}} searchObj 
 * @param {number} limit 
 * @param {QuerySnapshot} afterSnapshot
 * @returns 
 */
 export async function searchGyms(searchObj, limit, afterSnapshot)
 {
    if (!searchObj.nameStart)
        return;
    if (!limit)
        limit = 10;
    let query = firebase.firestore().collection('gyms');
    if (searchObj.nameStart)
        query = query
            .where('name', '>=', searchObj.nameStart)
            .where('name', '<=', searchObj.nameStart + '\uf8ff');
    if (afterSnapshot)
        query = query.startAfter(afterSnapshot);
    query = query.limit(limit);
    return getDocs(query)
        .catch(_ => alert(_));
 }
 
/**
 * 
 * @param {{nameStart: string, creatorUuid: string}} searchObj
 * @param {number} limit 
 * @param {QuerySnapshot} afterSnapshot
 * @returns 
 */
export async function searchWorkouts(searchObj, limit, afterSnapshot)
 {
     if (!searchObj.nameStart && !searchObj.emailFragment)
         return;
     if (!limit)
         limit = 10;

     let query = firebase.firestore().collection('workouts');
     if (searchObj.nameStart)
        query = query
            .where('nameAkaTitle', '>=', searchObj.nameStart)
            .where('nameAkaTitle', '<=', searchObj.nameStart + '\uf8ff')
    if (searchObj.creatorUuid)
        query = query
            .where('user', '>=', searchObj.creatorUuid)
            .where('user', '<=', searchObj.creatorUuid + '\uf8ff');          
    if (afterSnapshot)
        query = query.startAfter(afterSnapshot);
    query = query.limit(limit);
    return getDocs(query)
        .catch(_ => alert(_));
 }
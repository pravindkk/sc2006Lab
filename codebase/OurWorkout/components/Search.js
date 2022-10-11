import { firebase } from '../config'
import { User } from 'DataBoilerplate.js'

/**
 * @param {{nameStart: string, emailStart: string}} searchObj 
 * @param {[string]} searchObj.tags
 * @param {number} limit 
 * @param {QuerySnapshot} afterSnapshot
 * @returns 
 */
export async function searchUsers(searchObj, limit, afterSnapshot)
{
    if (!searchObj.nameStart && !searchObj.emailStart && !searchObj.tags)
        return;
    if (!limit)
        limit = 10;
    let query = firebase.firestore().collection('users');
    if (searchObj.nameStart)
        query = query
            .where('userDetails.name', '>=', searchObj.nameStart)
            .where('userDetails.name', '<=', searchObj.nameStart+ '\uf8ff');
    if (searchObj.emailStart)
        query = query
            .where('userEmail', '>=', searchObj.emailStart)
            .where('userEmail', '<=', searchObj.emailStart+ '\uf8ff');
            if (searchObj.emailStart)
    if (searchObj.tags)    
    query = query
        .where('userDetails.tags', 'in', searchObj.tags)
    if (afterSnapshot)
        query = query.startAfter(afterSnapshot);
    return query
        .getDocs()
        .then(_ => _.map(_ => User.fromUser(_)))
        .catch(_ => alert(_));
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
    return query
        .getDocs()
        .then(_ => _.map(_ => User.fromUser(_)))
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
    return query
        .getDocs()
        .then(_ => _.map(_ => User.fromUser(_)))
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
    return query
        .getDocs()
        .then(_ => _.map(_ => User.fromUser(_)))
        .catch(_ => alert(_));
 }
'use strict';

const awsXRay = require('aws-xray-sdk-core');
const AWS = awsXRay.captureAWS(require('aws-sdk'));
const REGION = process.env.AWS_REGION || 'us-west-2';
AWS.config.update({ region: REGION });
const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE;


function get(id, sortKey) {
    let params = {
        TableName: tableName,
        Key: {
            id: id,
            sortKey: sortKey
        }
    };
    return dynamo.get(params).promise()
        .then((data) => {
            return Promise.resolve(data.Item)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
};

function post(item){

    const params = {
        TableName: tableName,
        Item: item
    };

    return dynamo.put(params).promise()
        .then((data) => {
            return Promise.resolve(data.Item)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
};


function remove(id, sortKey){

    let params = {
        TableName: tableName,
        Key: {
            id: id,
            sortKey: sortKey
        }
    };
    return dynamo.delete(params).promise()
        .then((data) => {
            return Promise.resolve(data.Item)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
};


module.exports = {
    get: get,
    post: post,
    remove: remove
};
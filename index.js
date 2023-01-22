const MongoClient = require('mongodb').MongoClient;

async function main() {
    const uri = process.env['DATABASE_URL'];
    let client = new MongoClient(uri);

    let data = { "name":"cbolton" };
    try {
        await client.connect();
        await client.db("dm-db").collection("test").insertOne(data);
        console.log(`added ${data} to database.`);
        return { ok: true };
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem adding the data to the database." },
            "statusCode": 400
        };
    } finally {
        await client.close();
    }
}

module.exports.main = main;

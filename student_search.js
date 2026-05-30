const { MongoClient } = require('mongodb');
const readlineSync = require('readline-sync');

const url = 'mongodb://127.0.0.1:27017';

async function searchStudent() {

    const client = new MongoClient(url);

    await client.connect();

    const db = client.db('college');
    const collection = db.collection('student');

    // Synchronous input
    const partialName = readlineSync.question(
        "Enter Partial Name to Search: "
    );

    const result = await collection.find({
        name: {
            $regex: partialName,
            $options: 'i'
        }
    }).toArray();

    console.log("\nMatching Students:");
    console.log(result);

    client.close();
}

searchStudent();
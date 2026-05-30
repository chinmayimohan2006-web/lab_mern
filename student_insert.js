const { MongoClient } = require('mongodb');
const readlineSync = require('readline-sync');

const url = 'mongodb://127.0.0.1:27017';

async function insertStudent() {

    const client = new MongoClient(url);

    await client.connect();

    const db = client.db('college');
    const collection = db.collection('student');

    // Synchronous input
    const usn = readlineSync.question("Enter USN: ");
    const name = readlineSync.question("Enter Name: ");
    const sem = readlineSync.questionInt("Enter Semester: ");
    const year = readlineSync.questionInt("Enter Year of Admission: ");

    const student = {
        usn: usn,
        name: name,
        sem: sem,
        year_of_admission: year
    };

    const result = await collection.insertOne(student);

    console.log("\nStudent Inserted Successfully");
    console.log(result);

    client.close();
}

insertStudent();
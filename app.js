const fs = require('fs');
const readlineSync = require('readline-sync');

const FILE_NAME = 'students.json';

// Create file if not exists
if (!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, '[]');
}

// Read students from file
function readStudents() {
    const data = fs.readFileSync(FILE_NAME, 'utf8');
    return JSON.parse(data);
}

// Write students to file
function writeStudents(students) {
    fs.writeFileSync(FILE_NAME, JSON.stringify(students, null, 2));
}

// CREATE
function createStudent() {

    const students = readStudents();

    const usn = readlineSync.question("Enter USN: ");
    const name = readlineSync.question("Enter Name: ");
    const sem = readlineSync.questionInt("Enter Semester: ");
    const year = readlineSync.questionInt("Enter Year of Admission: ");

    const student = {
        usn,
        name,
        sem,
        year_of_admission: year
    };

    students.push(student);

    writeStudents(students);

    console.log("\nStudent Added Successfully\n");
}

// READ
function readAllStudents() {

    const students = readStudents();

    console.log("\nStudent Records:\n");

    if (students.length === 0) {
        console.log("No Records Found");
        return;
    }

    console.table(students);
}

// UPDATE
function updateStudent() {

    const students = readStudents();

    const usn = readlineSync.question(
        "Enter USN to Update: "
    );

    const index = students.findIndex(
        s => s.usn === usn
    );

    if (index === -1) {
        console.log("Student Not Found");
        return;
    }

    students[index].name =
        readlineSync.question("Enter New Name: ");

    students[index].sem =
        readlineSync.questionInt("Enter New Semester: ");

    students[index].year_of_admission =
        readlineSync.questionInt(
            "Enter New Year of Admission: "
        );

    writeStudents(students);

    console.log("\nStudent Updated Successfully\n");
}

// DELETE
function deleteStudent() {

    let students = readStudents();

    const usn = readlineSync.question(
        "Enter USN to Delete: "
    );

    const newStudents = students.filter(
        s => s.usn !== usn
    );

    if (students.length === newStudents.length) {
        console.log("Student Not Found");
        return;
    }

    writeStudents(newStudents);

    console.log("\nStudent Deleted Successfully\n");
}

// MENU
while (true) {

    console.log("\n===== STUDENT CRUD MENU =====");
    console.log("1. Create Student");
    console.log("2. Read All Students");
    console.log("3. Update Student");
    console.log("4. Delete Student");
    console.log("5. Exit");

    const choice = readlineSync.questionInt(
        "\nEnter Your Choice: "
    );

    switch (choice) {

        case 1:
            createStudent();
            break;

        case 2:
            readAllStudents();
            break;

        case 3:
            updateStudent();
            break;

        case 4:
            deleteStudent();
            break;

        case 5:
            console.log("Exiting Program...");
            process.exit();

        default:
            console.log("Invalid Choice");
    }
}
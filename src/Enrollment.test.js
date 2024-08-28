import {Enrollment} from "./Enrollment";
import {describe, it, expect} from "vitest";
import {Course} from "./Course";
import {Student} from "./Student";

describe('Enrollment', () => {
    let course;
    let student;
    let enrollment;
    let anotherStudent;

    beforeAll(async () => {
        await Course.sync();
        await Student.sync();
        await Enrollment.sync();
        course = await _createCourse();
        student = await _createStudent(1);
        anotherStudent = await _createStudent(6);
        enrollment = await _createEnrollment();
    });

    it("Default enrollment is created", async () => {
        const e = await Enrollment.findOne({
            where: {
                studentId: student.id,
                courseId: course.id
            }
        });
        expect(e).toBeTruthy();
        expect(e.id).toBe(enrollment.id);
        expect(e.status).toBe('enrolled');
    });

    it("Only one enrollment in the database", async () => {
        const count = await Enrollment.count();
        expect(count).toBe(1);
    });

    it('Test upsert', async () => {
        expect(await Enrollment.count()).toBe(1);

        // This should create a new enrollment
        const [newEnrollment, _updated] = await Enrollment.upsert({
            studentId: anotherStudent.id,
            courseId: course.id,
            status: 'enrolled'
        });
        expect(newEnrollment).toBeTruthy();
        expect(newEnrollment.id).not.toBe(enrollment.id);
        expect(newEnrollment.status).toBe('enrolled');
        expect(newEnrollment.studentId).toBe(anotherStudent.id);

        let allEnrollments = await Enrollment.findAll();
        expect(allEnrollments.length).toBe(2);
        console.log("Enrollments after first upsert:");
        allEnrollments.forEach(e => {
            console.log(e.toJSON());
        });

        // This should update the existing enrollment
        const [updatedEnrollment, _updated2] = await Enrollment.upsert({
            studentId: student.id,
            courseId: course.id,
            status: 'dropped out'
        });

        allEnrollments = await Enrollment.findAll();
        console.log("Enrollments after second upsert:");
        allEnrollments.forEach(e => {
            console.log(e.toJSON());
        });
        expect(allEnrollments.length).toBe(2);

        expect(updatedEnrollment.status).toBe('dropped out');
        expect(updatedEnrollment.id).toBe(enrollment.id);
    });

    async function _createCourse() {
        return Course.create({
            name: 'Course 1',
            description: 'Course 1 description'
        });
    }

    async function _createStudent(num) {
        return Student.create({
            name: `Student ${num}`,
            email: `student${num}@example.com`,
            phone: `+1234567890${num}`
        });
    }

    async function _createEnrollment() {
        return Enrollment.create({
            studentId: student.id,
            courseId: course.id,
            enrollmentDate: new Date(),
            status: 'enrolled'
        });
    }
});
// Import the File System module
const fs = require('fs');
const {set_user_course_summary} = require('../../lib/services/database_service');
const { make_courses_info } = require('../services/canvas_service');
const { query_gpt } = require('../services/canvas_service');

// Path to the JSON file
const filePath = 'lib/models/courses.json';

// Function to read and parse the JSON file
function loadCourses(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Function to search for a course by its name
function searchCourse(courses, courseName) {
    const course = courses.find(course => course.class_name === courseName);
    return course ? course.description : 'Course not found.';
}

async function get_course_description(course_name) {
    try {
        const courses = await loadCourses(filePath);
        console.log(searchCourse(courses, course_name));
        return searchCourse(courses, course_name);
    } catch (err) {
        console.log("No info for course");
        return "No Info Available"
    }
}

async function set_course_summary(user_id) {
    console.log("Requesting conversation start!!!");
    const chatbotService = await import('../../lib/services/chatbot_service.mjs');
    const create_agent_and_get_thread = chatbotService.create_agent_and_get_thread;
    const get_chat_response = chatbotService.get_chat_response;
    let background = '';
    const course_descriptions = await make_courses_info(user_id);
    for(let course of course_descriptions){
        let course_content = await query_gpt(course);
        background += course_content+'\n';
    }

    console.log(background);
    set_user_course_summary(user_id, background);

}

// get_course_description("C S 1313");

module.exports = {
    get_course_description,
    set_course_summary
}
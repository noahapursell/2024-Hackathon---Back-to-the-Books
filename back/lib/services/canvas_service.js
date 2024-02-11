function ping_canvas(token) {
  fetch('https://canvas.ou.edu/api/v1/courses/', {
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
  }).then(response => response.json()).then(data => console.log(data));
}

async function get_courses(token){
    let courses_data = await fetch(`https://canvas.ou.edu/api/v1/courses/?enrollment_state=active&per_page=${30}&include[]=public_description&include[]=syllabus_body`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });

    courses_data = await courses_data.json();
    //console.log(courses_data);
    return courses_data;
}

async function get_course_assignments(token, course_id){
    let assignments_data = await fetch(`https://canvas.ou.edu/api/v1/courses/${course_id}/assignments?per_page=${30}&bucket=upcoming`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });

    assignments_data = await assignments_data.json();
    return assignments_data;
}

async function get_assignments(token){
    let courses = await get_courses(token);

    let assignments = [];
    for(let course of courses){
        if(course.name === undefined) continue;
        //console.log(course.name);
        let ca = await get_course_assignments(token, course.id);
        assignments.push(...ca);
    }

    return assignments;
}

async function display_assignments(token){
    let courses = await get_courses(token);
    // console.log(courses);
    for(let course of courses){
        if(course.name === undefined) continue;
        console.log(course.name);
        let assignments = await get_course_assignments(token, course.id);
        for(let i = 0; i < assignments.length; i++){
            console.log('   '+assignments[i].name);
            //console.log(assignments[i]);
        }
    }
}

const get_user_token = require('./database_service').get_user_token;
async function make_courses_info(user_id){
    let token = await get_user_token(user_id);
    console.log(token);
    let courses = await get_courses(token);

    let course_descriptions = [];

    for(let course of courses){
        if(course.name === undefined) continue;

        let course_description = {
            name: course.name,
            //syllabus: course.syllabus_body,
            assignments: []
        };
    
        let assignments = await get_course_assignments(token, course.id);
        for(let i = 0; i < assignments.length; i++){
            let assignment = {
                name: assignments[i].name,
                description: assignments[i].description,
                due_at: assignments[i].due_at
            };
            course_description.assignments.push(assignment);
        }

        course_descriptions.push(course_description);
    }

    // for(let course of course_descriptions){
    //     console.log(course.name);
        
    //     for(let assignment of course.assignments){
    //         console.log('   '+assignment.name);
    //         console.log('   '+assignment.description);
    //         console.log('   '+assignment.due_at);
    //         console.log();
    //     }
    //     console.log();
    //     console.log();
    // }
    return course_descriptions;
}

async function query_gpt(course_description){
    const chatbotService = await import('./chatbot_service.mjs');
    const chat_completion = chatbotService.chat_completion;

    let response = await chat_completion(
        'Give a summary of the course content based on the following information.\
         Try to list a few of the key concepts that the course will cover. If there is not enough information, make an educated guess: \
         Try to give information about what the students will learn in the course.'
         +JSON.stringify(course_description)
    );
    return response;
}

async function make_flashcards(user_id){
    const chatbotService = await import('./chatbot_service.mjs');
    const make_flashcard_set_from_class_content = chatbotService.make_flashcard_set_from_class_content;

    let course_descriptions = await make_courses_info(user_id);
    for(let course of course_descriptions){
        let course_content = await query_gpt(course);
        try{
            await make_flashcard_set_from_class_content(user_id, course_content, course.name);
        }
        catch(e){
            console.log("Error making flashcards for course: "+course.name);
        }
    }
}

module.exports = {
    get_assignments,
    make_flashcards,
    make_courses_info,
    query_gpt,
}
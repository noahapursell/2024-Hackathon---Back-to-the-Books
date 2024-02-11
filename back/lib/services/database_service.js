const { users, calendar_events, flashcard_sets, flashcards } = require('../../database/database_construction');

async function add_user(first_name, last_name, phone_number, email, password_hash, canvas_token) {
    const user = await users.create({
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        email: email,
        password_hash: password_hash,
        score: 0,
        canvas_token: canvas_token
    });
    return user;
}

async function authenticate_user(email, password) {
    const user = await users.findOne({
        where: {
            email: email,
            password_hash: password
        }
    });
    if (user === null) {
        return -1;
    }


    return user.id;
}

async function get_user_token(user_id) {
    const user = await users.findOne({
        where: {
            id: user_id
        }
    });
    if (user === null) {
        return -1;
    }
    return user.canvas_token;

}

async function get_user_info(user_id) {
    const user = await users.findOne({
        where: {
            id: user_id
        }
    });
    if (user === null) {
        return -1;
    }
    return user;
}

async function add_calendar_event(user_id, title, description, start_time, end_time) {
    const event = await calendar_events.create({
        user_id: user_id,
        title: title,
        description: description,
        start_time: start_time,
        end_time: end_time
    });
    return event;
}

async function get_calendar_events(user_id) {
    const events = await calendar_events.findAll({
        where: {
            user_id: user_id
        }
    });
    return events;

}

async function remove_calendar_event(event_id) {
    const event = await calendar_events.findOne({
        where: {
            id: event_id
        }
    });
    if (event === null) {
        return -1;
    }
    await event.destroy();
    return 0;
}

async function add_flashcard_set(user_id, title, description, is_public) {
    const set = await flashcard_sets.create({
        user_id: user_id,
        title: title,
        description: description,
        is_public: is_public
    });
    return set.id;
}

async function get_flashcard_sets(user_id) {
    const sets = await flashcard_sets.findAll({
        where: {
            user_id: user_id
        }
    });
    return sets;
}

async function get_flashcard_set(set_id) {
    console.log("Finding flashcards with :" + set_id);
    const set = await flashcards.findAll({
        where: {
            flashcard_set_id: set_id
        }
    });
    console.log(set);
    if (set === null) {
        return -1;
    }
    return set;
}

async function get_flashcard(flashcard_id) {
    const card = await flashcards.findOne({
        where: {
            id: flashcard_id
        }
    });
    if (card === null) {
        return -1;
    }
    return card;
}

async function remove_flashcard_set(set_id) {
    const set = await flashcard_sets.findOne({
        where: {
            id: set_id
        }
    });
    if (set === null) {
        return -1;
    }
    await set.destroy();
    return 0;
}

async function add_flashcard(set_id, question, answer) {
    const card = await flashcards.create({
        flashcard_set_id: set_id,
        question: question,
        answer: answer
    });
    return card;
}

async function increase_score(user_id, score) {
    const user = await users.findOne({
        where: {
            id: user_id
        }
    });
    if (user === null) {
        return -1;
    }
    user.score += score;
    user.save();
}


async function test_calendar() {
    const output = await add_calendar_event(1, 'Test Event2', 'This is a test event', new Date(), new Date());
    console.log(output);
    console.log(await get_calendar_events(1));
}

async function set_user_course_summary(user_id, course_summary) {
    const user = await users.findOne({
        where: {
            id: user_id
        }
    });
    if (user === null) {
        return -1;
    }
    user.course_summary = course_summary;
    user.save();

}

async function get_user_course_summary(user_id) {
    const user = await users.findOne({
        where: {
            id: user_id
        }
    });
    if (user === null) {
        return -1;
    }
    return user.course_summary;
}

async function get_leaderboard_order(){
    const leaderboard_order = await users.findAll({
        order: [
            ['score', 'DESC']
        ]
    });
    let leaderboard = [];
    for(let i = 0; i < leaderboard_order.length; i++){
        leaderboard.push({
            first_name: leaderboard_order[i].first_name,
            last_name: leaderboard_order[i].last_name,
            score: leaderboard_order[i].score
        });
    }
    return leaderboard;
}


// test_calendar();

module.exports = {
    add_user,
    authenticate_user,
    get_user_token,
    add_calendar_event,
    get_calendar_events,
    remove_calendar_event,
    add_flashcard_set,
    get_flashcard_sets,
    get_flashcard_set,
    remove_flashcard_set,
    add_flashcard,
    increase_score,
    get_user_info,
    get_flashcard,
    set_user_course_summary,
    get_user_course_summary,
    get_leaderboard_order
}
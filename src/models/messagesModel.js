import pool from "../config/db.js"

export const insertMessage = async (content, sent_by, sent_in_room) => {
    console.log('insertMessage FUNC called')
    console.log('content, sent_by, sent_in_room : ', content, sent_by, sent_in_room)
    // Insert into messages table the message: data
    const response = await pool.query(`
        INSERT INTO messages (content, sent_by, sent_in_room)
        VALUES ($1, $2, $3)`,
    [content, sent_by, sent_in_room]);

    return response;
}
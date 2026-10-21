import pool from '../config/db.js'

export const getAllUsersService = async() => {
    const query = `SELECT * FROM "users"`;
    const result = await pool.query(query);
    return result.rows;
}

export const getUserByUsername = async(username) => {
    console.log('getUserByUsername FUNC called');
    console.log('username : ', username)
    const response = await pool.query(`
            SELECT *
            FROM users
            WHERE username = $1
            `, [username]);
    
    console.log('response : ', response);

    const result = response.rows[0];
    console.log('result : ', result);

    return result
};

export const getUserByIdModel = async(id) => {
    console.log('getuserByIdService');
    const result = await pool.query(`
        SELECT *
        FROM users
        WHERE id = $1`,
        [id]);
    console.log('did we get it? did we??')
    console.log('Inside of getUserByIdService the result of const result = blah blah balh is : ', result);
    return result.rows[0]
}

export const createUserService = async(name, email, role) => {
    // const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    // if (existing.rows.length > 0) {
    //     throw new Error("Email already exists");
    // }

    // const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING * `;
    // const result = await pool.query(query, [name, email]);
    // return result.rows[0]
    try {
        const result = await pool.query(
            "INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *",
            [name, email, role]
        );
        return result.rows[0];
    } catch (err) {
        if (err.code === '23505') { // unique_violation
            const conflictError = new Error("Email already exists");
            conflictError.status = 409; // 409 Conflict
            throw conflictError;
        }
        throw err;
    }
};


export const updateUserService = async(id, name, email) => {
    const query = `UPDATE "users" SET name=$1, email=$2, WHERE id = $3 RETURNING *`
    const result = await pool.query(query, [name, email, id]);
    return result.rows[0]
}

export const deleteUserService = async(id) => {
    const query = `DELETE FROM users WHERE id=$1 RETURNING *`
    const result = await pool.query(query, [id]);
    return result.rows[0]
};


export const getUsernameAndCreated_atFromUserId = async(id) => {
    const response = await pool.query(`
        SELECT username, created_at
        FROM users
        WHERE users.id = $1`, [id]);

    const result = response.rows[0];

    console.log('result : ', result);
    return result
}

export const getCreated_atAndEmailFromUserId = async(id) => {
    const response = await pool.query(`
        SELECT created_at, email
        FROM users
        WHERE users.id = $1`, [id]);

    const result = response.rows[0];

    console.log('result : ', result);
    return result
}
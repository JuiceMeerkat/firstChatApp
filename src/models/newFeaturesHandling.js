import pool from "../config/db.js";

export const addNewIntermediateFeatureCommentToNewFeatureTable = async (content, sent_by) => {
    
    const response = await pool.query(`
        INSERT INTO new_features (content, sent_by, state, is_implemented)
        VALUES ($1, $2, $3, $4)`, [content, sent_by, 'pending', false]);

    console.log('response : ', response);

    const result = response.rows;
    return result;
};


// =====================

export const changeStateOfNewFeature = async (state, id) => {
    console.log('changeStateOfNewFeature (model) FUNC called');
    id = Number(id);

    console.log('state : ', state);
    console.log('id : ', id);

    const response = await pool.query(`
        UPDATE new_features
        SET state = $1
        WHERE id = $2`, [state, id]);

    console.log('response : ', response);

    const result = response.rows;
    return result;
};

export const changeIsImplementedOfNewFeature = async (isImplemented, id) => {
    console.log('changeIsImplementedOfNewFeature (model) FUNC called');
    id = Number(id);

    const response = await pool.query(`
        UPDATE new_features
        SET is_implemented = $1
        WHERE id = $2`, [isImplemented, id]);

    console.log('response : ', response);

    const result = response.rows;
    return result;
};

export const changeStateAndIsImplementedOfNewFeature = async (state, isImplemented, id) => {
    console.log('changeStateAndIsImplementedOfNewFeature (model) FUNC called');

    id = Number(id);

    console.log('state : ', state);
    console.log('typeof(state) : ', typeof(state));

    console.log('isImplemented : ', isImplemented);
    console.log('typeof(isImplemented) :', typeof(isImplemented));

    console.log('id : ', id);
    console.log('typeof(id) :', typeof(id));

    const response1 = await pool.query(`
        UPDATE new_features
        SET is_implemented = $1
        WHERE id = $2`, [false, id]);

    console.log('response1 : ', response1);

    const response2 = await pool.query(`
        UPDATE new_features
        SET is_implemented = $2, state = $1
        WHERE id = $3`, [state, isImplemented, id]);

    const response3 = await changeStateOfNewFeature(state, id);

    console.log('response2 : ', response2);

    const result = response2.rows;
    return result;
};


// ===================

export const getPendingNewFeatures = async () => {
    const response = await pool.query(`
        SELECT new_features.*, users.username
        FROM new_features, users
        WHERE new_features.sent_by = users.id
            AND new_features.state = $1
        ORDER BY new_features.created_at ASC`, ['pending']);

    console.log('response : ', response);

    const result = response.rows;
    console.log('result : ', result);


    return result;
};

export const getPendingAndApprovedNewFeatures = async () => {
    const response = await pool.query(`
        SELECT new_features.*, users.username
        FROM new_features, users
        WHERE new_features.sent_by = users.id
            AND ( new_features.state = $1 OR new_features.state = $2)
        ORDER BY new_features.created_at ASC`, ['pending', 'approved']);

    console.log('response : ', response);

    const result = response.rows;
    console.log('result : ', result);


    return result;
};

export const getAllNewFeatures = async () => {
    console.log("getAllNewFeatures FUNC (model) called")
    const response = await pool.query(`
        SELECT new_features.*, users.username
        FROM new_features, users
        WHERE new_features.sent_by = users.id
        ORDER BY state DESC, new_features.created_at ASC`);

    console.log('response : ', response);

    const result = response.rows;
    console.log('result : ', result);


    return result;
};
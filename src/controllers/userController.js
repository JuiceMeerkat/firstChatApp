import { getAllUsersService, getUserByIdService, updateUserService, deleteUserService, createUserService } from "../models/userModel.js";
console.log('--- : ', getAllUsersService, getUserByIdService, updateUserService, deleteUserService, createUserService)

// Standardised response function
const handleResponse = (res, status, message, data=null) => {
    res.status(status).json({
        status,
        message,
        data
    })
}

export const createUser = async(req, res, next) => {
    const { name, email, role } = req.body;
    try {
        const newUser = await createUserService(name, email, role);
        handleResponse(res, 201, 'User created Successfully', newUser)
    } catch(err) {
        next(err);
    }
}

export const getAllUsers = async(req, res, next) => {
    try {
        // console.log('jsut before')
        const users = await getAllUsersService();
        // console.log('just after')
        handleResponse(res, 200, 'User(s) fetched Successfully', users)
    } catch(err) {
        next(err);
    }
};

export const getUserById = async(req, res, next) => {
    console.log('hello')
    try {
        console.log('tried ');
        const user = await getUserByIdService(req.params.id);
        if (!user) return handleResponse(res, 404, 'User not found');
        handleResponse(res, 200, 'User fetched Successfully', user)
        console.log('user : ', user)
    } catch(err) {
        console.log('caught also');
        console.log('err : ', err);
        next(err);
    }
}

export const updateUser = async(req, res, next) => {
    const { name, email } = req.body;
    try {
        const updatedUser = await updateUserService(req.params.id, name, email);
        if (!updatedUser) return handleResponse(res, 404, 'User not found');
        handleResponse(res, 200, 'User updated Successfully', updatedUser)
    } catch(err) {
        next(err);
    }
}

export const deleteUser = async(req, res, next) => {
     try {
        const deletedUser = await deleteUserService(req.params.id);
        if (!deletedUser) return handleResponse(res, 404, 'User not found');
        handleResponse(res, 200, 'User deleted Successfully', deletedUser)
    } catch(err) {
        next(err);
    }
}

// export default getAllUsers, createUser, updateUser, deleteUser, getUserById
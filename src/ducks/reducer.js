const initialState = {
    user_id: 0,
    username: '',
    profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER';

export function updateUser(userObj){
    return {
        type: UPDATE_USER,
        payload: userObj
    }
};

export default function reducer(
    state = initialState, action
){
    const {type, payload} = action;
    switch(type){
        case UPDATE_USER:
            const {
                user_id, username, profile_pic
            } = payload;
            return {
                ...state, 
                user_id, username, profile_pic
            };
        default:
            return state;
    }
}
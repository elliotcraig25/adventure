const initialState = {
    user_id: 0,
    username: '',
    profile_pic: '',
    loggedIn: false,
    z: true,
    zText: '',
    a: true,
    aText: '',
    b: true,
    bText: '',
    c: true,
    cText: '',
    d: true,
    dText: '',
    data: []
}

const PLZ_UPDATE_ALL_DATA = 'PLZ_UPDATE_ALL_DATA';
const UPDATE_USER = 'UPDATE_USER';

const UPDATEREDUXZABCD = 'UPDATEREDUXZABCD';
const UPDATEREDUXZ = 'UPDATEREDUXZ';
const UPDATEREDUXA = 'UPDATEREDUXA';
const UPDATEREDUXB = 'UPDATEREDUXB';
const UPDATEREDUXC = 'UPDATEREDUXC';
const UPDATEREDUXD = 'UPDATEREDUXD';

export function updateAllData(userObj){
    // console.log('you have hit here', userObj)
    return {
        type: PLZ_UPDATE_ALL_DATA,
        payload: userObj
    }
}

export function updateUser(userObj){
    return {
        type: UPDATE_USER,
        payload: userObj
    }
};

export function updateReduxZABCD(userObj){
    return {
        type: UPDATEREDUXZABCD,
        payload: userObj
    }
};

export function updateReduxZ(userObj){
    return {
        type: UPDATEREDUXZ,
        payload: userObj
    }
};

export function updateReduxA(userObj){
    return {
        type: UPDATEREDUXA,
        payload: userObj
    }
};

export function updateReduxB(userObj){
    return {
        type: UPDATEREDUXB,
        payload: userObj
    }
};

export function updateReduxC(userObj){
    return {
        type: UPDATEREDUXC,
        payload: userObj
    }
};

export function updateReduxD(userObj){
    return {
        type: UPDATEREDUXD,
        payload: userObj
    }
};

export default function reducer(
    state = initialState, action
){
    const {type, payload} = action;
    switch(type){
        case PLZ_UPDATE_ALL_DATA:
            const {
                data
            } = payload
            return {
                ...state,
                data
            };
        case UPDATE_USER:
            const {
                user_id, username, profile_pic
            } = payload;
            const loggedIn = true
            return {
                ...state, 
                user_id, username, profile_pic, loggedIn
            };
        case UPDATEREDUXZ:
            const {
                z, zText, aText, bText, cText, dText, z_type
            } = payload;
            return  {
                ...state, z, zText, aText, bText, cText, dText, z_type
            }
        case UPDATEREDUXA:
            const {
                a
            } = payload;
            return  {
                ...state, a
            }
        case UPDATEREDUXB:
            const {
                b
            } = payload;
            return  {
                ...state, b
            }
        case UPDATEREDUXC:
            const {
                c
            } = payload;
            return  {
                ...state, c
            }
        case UPDATEREDUXD:
            const {
                d
            } = payload;
            return  {
                ...state, d
            }
        case UPDATEREDUXZABCD:
            return  {
                ...state, z: true, a: true, b: true, c: true, d: true
            }
        default:
            return state;
    }
}
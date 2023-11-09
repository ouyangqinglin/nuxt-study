import {useState} from "#app";

export const useTokenState = () => {
    return useState('token', () => ({
        token: ''
    }))
}

export const useUserState = () => {
    return useState('user', () => ({
        name: '',
        uid: '',
        userType: '',
        avatar: ''
    }))
}
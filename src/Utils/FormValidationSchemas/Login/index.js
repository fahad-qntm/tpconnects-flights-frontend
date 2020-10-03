import * as yup from 'yup'

export const LoginYup = yup.object().shape({
    email: yup
        .string('Please enter your email')
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Please enter your password')
        .required('Password is required')
})

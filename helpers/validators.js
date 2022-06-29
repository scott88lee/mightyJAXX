export const passwordLength = (password) => {
    return password.length >= 8;
}

export const containsNumber = (password) => {
    return /\d/.test(password);
}

export const containsUpperCase = (password) => {
    return /[A-Z]/.test(password);
}

export const containsLowerCase = (password) => {
    return /[a-z]/.test(password);
}

export const containsSpecialChar = (password) => {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

export const emailString = (email) => {
    //check valid email string
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}
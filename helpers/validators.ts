export const passwordLength = (password: string): boolean => {
    return password.length >= 8;
}

export const containsNumber = (password: string): boolean => {
    return /\d/.test(password);
}

export const containsUpperCase = (password: string): boolean => {
    return /[A-Z]/.test(password);
}

export const containsLowerCase = (password: string): boolean => {
    return /[a-z]/.test(password);
}

export const containsSpecialChar = (password: string): boolean => {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

export const emailString = (email: string): boolean => {
    //check valid email string
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}
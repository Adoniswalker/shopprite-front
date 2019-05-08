export const read_cookie = name => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export const createCookie = (name, value, days) => {
    let expires;
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    let cookie = name + "=" + value + expires;
    document.cookie = cookie;
    return cookie;
};

export const removeCookie = name => {
    //delete the token by setting past date
    let now = new Date();
    now.setMonth(now.getMonth() - 1);
    // let token = "token=" + read_cookie("token");
    let cookie = `${name}=${read_cookie(name)}`;
    // document.cookie = token + ";expires=" + now.toUTCString() + ";";
    document.cookie = cookie + ";expires=" + now.toUTCString() + ";";
    // delete user details from local storage
    // window.localStorage.removeItem("user");
};

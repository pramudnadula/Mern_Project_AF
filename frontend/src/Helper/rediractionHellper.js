export function Checktoken() {
    if (localStorage.getItem("x-auth-token") === null) {
        window.location = "/";
        return <></>
    }   
}

export function TokenExpired(){
    localStorage.clear();
    window.location = "/login";
}
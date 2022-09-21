const arr = {
    "contas": [
        {
            "id": 1,
            "email": "sunshinedn2003@gmail.com",
            "password": "dodo2003"
        },
        {
            "id": 2,
            "email": "douglascabral5000@gmail.com",
            "password": "doug2003"
        }
    ]
}

let emailLogin = "douglascabral5000@gmail.com"

const login = arr.contas.filter(element => {
    const { email } = element;
    if (email == emailLogin) return element
})

console.log(login)
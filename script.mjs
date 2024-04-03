import fetch from "node-fetch"


async function getUsers () {
    let url = 'https://club.jactc.xyz/api/v1/users';
    
    let options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err))   
}

async function registerUser () {

    let url = 'https://club.jactc.xyz/api/v1/auth/register';
    
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{"fullName":"aaaa","email":"a@a.c","password":"Holaand"}'
    };
    
    fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

getUsers()
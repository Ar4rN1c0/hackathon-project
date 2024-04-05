import { register } from "module";
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
        body: '{"fullName":"Marta","email":"marta@example.com","password":"martapass"}'
    };
    
    fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

async function getUserById () {
    let url = "https://club.jactc.xyz/api/v1/user/profile/890ed375-e4a2-473d-a784-37ccad19123c"
    let options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jIiwidXNlcklkIjoiODkwZWQzNzUtZTRhMi00NzNkLWE3ODQtMzdjY2FkMTkxMjNjIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTIyMzIxNDksImV4cCI6MTcxMjIzNTc0OX0.uZdHLWbzh7x3EjWBcYLboZjibHgEHKLm3DijwOwFpVk"
        }
    }
    fetch(url, options).then(res => res.json()).then(res => console.log(res)).catch(err => console.error(err))
}

async function validateUser () {
    let url = "https://club.jactc.xyz/api/v1/auth/validate/"
    let options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jIiwidXNlcklkIjoiODkwZWQzNzUtZTRhMi00NzNkLWE3ODQtMzdjY2FkMTkxMjNjIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTIyMzk4OTQsImV4cCI6MTcxMjI0MzQ5NH0.OoCWTvK3CvGae1zR7v7L4TrkwoT0GLy8MM6GB7d6w5A"
        }
    }
    fetch(url, options).then(res => res.json()).then(res => console.log(res.success)).catch(err => console.error(err))
}

validateUser()
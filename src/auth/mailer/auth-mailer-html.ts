
export class AuthMailerHtml{


    generateMail(API_URL, token){
        return `<div><a href="${API_URL}/user/active/${token}"></a>${API_URL}/users/active/${token}</div>`
    }
}
export function generateRoomID(){
    const OPTIONS = ['A','B','C','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    let token ;
    for (let index = 0; index < OPTIONS.length; index++) {
        token += OPTIONS[Math.floor(Math.random()*OPTIONS.length)]
        return token
    }
}
export function generateRoomID(){
    const OPTIONS = ['A','B','C','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',,'1','2','3','4','5','6','7','8','9','0']
    let token ="#";
    for (let index = 0; index < 6; index++) {
        token += OPTIONS[Math.floor(Math.random()*OPTIONS.length)]
        
    }
    return token
}
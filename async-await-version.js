export default async function getClue(){
    const response = await fetch("https://jservice.xyz/api/random-clue")
    if(response.ok === false ){
        throw new Error(response.status)
    } else{
        return await response.json()
    }
}

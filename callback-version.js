export default function getClue(cb){
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', e =>{
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if(xhr.status !==200){
            cb(xhr.status)
        } else{
            const data = JSON.parse(xhr.responseText);
            cb(null, data);
        }
    })

    xhr.open("GET", "https://jservice.xyz/api/random-clue");
    xhr.send();
}

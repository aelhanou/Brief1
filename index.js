const start = document.querySelector('.start')
const highScore = document.querySelector('#highScore')
const ListScor = document.getElementById('ListScore')
const ListScore0 = document.getElementById('ListScore0')
const iconify = document.getElementById('iconify')
ListScore0.style.display = "none"
const storageKey = []

start.addEventListener('click', () => {
    window.location = "game.html";
})

if (localStorage.length > 0) {
    for (var i = 0; i < localStorage.length; i++) {
        storageKey.push({
            value: localStorage.getItem(localStorage.key(i)),
            key: localStorage.key(i)
        })
    }
}

highScore.addEventListener("click", async () => {
    ListScor.innerHTML = ''
    ListScore0.style.display = "block"
    let div = document.createElement('div')
    

    let SortScore = await Array.from(storageKey).sort((a,b) => {
        return b.value - a.value
    })

    div.classList.add("w-full")
    SortScore.map(e => {
        if (e.key != "undefined" || e.value != "undefined" ) {
            div.innerHTML += `
            <div class="flex  text-white  font-semibold mt-3" style="width:100%">
                <div class="  w-full ml-5 "><span class="text-red-300">Name:</span> ${e.key}</div>
                <div class=" w-full text-center"><span class="text-red-300">Score:</span>  ${e.value}</div>
            </div> `
        }
    })
    ListScor.append(div)
})

const closeListScore = () => {
    ListScore0.style.display = "none"
}
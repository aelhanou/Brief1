const Questions = document.querySelector('.questions')
const Answers = document.querySelector('.answers')
const submitScore = document.getElementById('submitScore')
const inputScore = document.getElementById('inputScore')
const Score = document.querySelector('.score')
const EndGame = document.querySelector('.endGame')
const FinalScore = document.getElementById('FinalScore')
let GlobalData = []
let StopFetching = 0
let correct = null
let GlobalScore = 0
let count = 0
let AllQuizThatPassed = []
let DisplayQuiz = []
let time = 0

const data = async () => {
    const resp = await fetch("http://127.0.0.1:5500/index.json", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const dt = await resp.json()
    const {
        data
    } = dt
    return dt
}


const fetchData = async () => {
    GlobalData = await data()
    displayRandomQuestions(GlobalData)
}

StopFetching >= 0 && fetchData()
StopFetching++


const displayRandomQuestions = ({
    data
}) => {
    const random = getRandomInt(data.length - 1)
    DisplayQuiz = data[random]
    Questions.innerHTML = DisplayQuiz.Questions
    Array.from(DisplayQuiz.Answers).map(async (e, i) => createBtn(e, i + 1))
    correct = DisplayQuiz.correct
}

const createBtn = (e, i) => {
    let btn = document.createElement("button");
    btn.classList.add("btnDisabled", "p-2", "fontSize", "lastBtn", "btnWidth", "h-20", "text-center", "transition", "duration-500", "ease-in-out", "transform", "hover:scale-105", "hover:bg-gray-400", "border-2", "bg-white", "text-black", "rounded-xl")
    btn.setAttribute('id', i)
    btn.innerHTML = e
    btn.setAttribute("onclick", "getAnswer(this)")
    Answers.appendChild(btn)
}


const skipRepetition = async (GlobalData, AllQuizThatPassed) => {
    GlobalData.data.map(e => {
        AllQuizThatPassed.map(f => {
            if (JSON.stringify(f) === JSON.stringify(e)) {
                let a = GlobalData.data.indexOf(f)
                GlobalData.data.splice(a, 1)
            }
        })
    })
}





const getAnswer = async (r) => {

    const btnCorrect = document.getElementById(r.id)
    const btnDisabled = document.querySelectorAll('.btnDisabled')

    Array.from(btnDisabled).map(e => {
        console.log(e);
        e.disabled = true
    })
    if (correct != null) {
        if (r.id == correct) {
            btnCorrect.style.backgroundColor = 'green'
            GlobalScore++;
            count++;
            Score.innerHTML = GlobalScore
        } else {
            btnCorrect.style.backgroundColor = 'red'
            count++;
            // LoadingCount()
        }
    }
    time = 0
    LoadingCount()
    Timeout()
    AllQuizThatPassed.push(DisplayQuiz)
    if (count >= 5) {
        displayPopUpEndingGame()
    } else {
        EndGame.style.visibility = "hidden"
    }
    setTimeout(() => {
        ClearButton(GlobalData)
    }, 1000)
}


const displayPopUpEndingGame = () => {
    FinalScore.innerHTML = GlobalScore
    setTimeout(() => {
        EndGame.style.visibility = 'visible'
    }, 1000)
    return 0
}


const LoadingCount = () => {
    const parentDiv = document.querySelector('.Count')

    parentDiv.innerHTML = ''
    // Count.innerHTML = ''
    if (count <= 5) {
        let div = document.createElement('div')
        div.classList.add('w-full', 'bg-white', 'h-full', 'rounded')
        div.innerHTML = `
        <div class="h-full bg-black rounded " style="width: ${count * 40}px">
        </div>
    `
        parentDiv.appendChild(div)
    }
}


const ClearButton = async (data) => {
    let Data = await data
    let parent = document.getElementById('anse')
    let childs = document.querySelectorAll('.lastBtn')
    let a = await Array.from(childs).filter(e => {
        parent.removeChild(e)
    })
    if (a.length == 0) {
        skipRepetition(GlobalData, AllQuizThatPassed)
        displayRandomQuestions(Data)

    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



submitScore.addEventListener("click", () => {
    GameOver(inputScore.value, GlobalScore)
    window.location = "index.html";
})

const GameOver = (name, fscore) => {
    localStorage.setItem(name, fscore)
    getScore = localStorage.getItem(name)
}


const Timeout = () => {

    if (time <= 6) {
        const timeOut = document.querySelector(".timeOut")
        timeOut.innerHTML = ""
        let div = document.createElement('div')
        div.classList.add('w-full', 'bg-white', 'h-full', 'rounded')
        div.innerHTML = `
        <div class="h-full bg-yellow-400 rounded " style="width: ${time * 100}px">

        </div>
    `
        timeOut.appendChild(div)
        time++
    } else {
        count++
        LoadingCount()
        skipQuestion(GlobalData)
        time = 0
        count >= 5 && displayPopUpEndingGame()
    }
}



let TimetoStop = setInterval(() => {
    if (count < 5) {
        console.log(count);
        Timeout()
    }
}, 1500)





const skipQuestion = (data) => {
    console.log(data);
    ClearButton(data)
}
// if(time <= 6){
//     clearInterval(TimetoStop)
// }









///////////////////////////////
// const StartGame = () => {
//     window.location = "game.html";
// }


// const checkAnswer = async (e) => {
//     let {
//         data
//     } = e
//     if (CountArray <= 0) {
//         randmData.push(...data)
//         newarray = randmData
//     }

//     const random = getRandomInt(  newarray.length -1 )
//     // if (CountArray <= 0) {
//     //     newarray = randmData
//     // }

//     let newRnd = await removeRepetetion(newarray[random])
//     console.log(random);
//     let rndm = newRnd[random]
//     console.log(newRnd.length);
//     CountArray++

//     // t.map(e =>{
//     //     if(e){
//     //         return e
//     //     }
//     // })

//     // console.log(t);

//     // console.log(randmData);

//     Questions.innerHTML = rndm.Questions
//     Array.from(rndm.Answers).map(async (e, i) => createBtn(e, i + 1))
//     correct = correctAnswer(rndm.correct)

// }

// const removeRepetetion = async (e) => {

//     console.log(e);
//     if(CountArray > 0){

//    let yo =  await newarray.map((f, i) => {
//         // console.log(f);
//         if (JSON.stringify(e) === JSON.stringify(f)) {
//             a = newarray.indexOf(e)
//             // console.log(a);
//             newarray.splice(a, 1)
//             // console.log(JSON.stringify(f));
//             // console.log(JSON.stringify(e));
//         } else {
//             return e
//         }

//     })
//     newarray.filter((e) => {
//         return e !== undefined
//     })

//     // console.log(newarray);
//     newarray = [...new Set(newarray)]

// }
// return newarray
// }


// const Ansewr = async (e) => {
//     let data = await e
//     let parent = document.getElementById('anse')
//     let childs = document.querySelectorAll('.lastBtn')
//     let a = await Array.from(childs).filter(e => {
//         parent.removeChild(e)
//     })
//     if (a.length == 0) {
//         checkAnswer(data)
//     }
// }

// const createBtn = (e, i) => {
//     let btn = document.createElement("button");

//     btn.classList.add("p-2", "fontSize", "lastBtn", "btnWidth", "h-20", "text-center", "transition", "duration-500", "ease-in-out", "transform", "hover:scale-105", "hover:bg-gray-400", "border-2", "bg-white", "text-black", "rounded-xl")
//     btn.setAttribute('id', i)
//     btn.innerHTML = e
//     btn.setAttribute("onclick", "getAnswer(event, this)")
//     Answers.appendChild(btn)
// }

// const correctAnswer = (e) => {
//     return e
// }

// const getAnswer = async (e, r) => {
//     const btnCorrect = document.getElementById(r.id)
//     const FinalScore = document.getElementById('FinalScore')

//     if (correct != null) {
//         if (r.id == correct) {
//             btnCorrect.style.backgroundColor = 'green'
//             fscore++;
//             count++;
//             Score.innerHTML = fscore
//         } else {
//             btnCorrect.style.backgroundColor = 'red'
//             count++;
//         }
//     }
//     if (count >= 4) {
//         FinalScore.innerHTML = fscore
//         setTimeout(() => {
//             EndGame.style.visibility = 'visible'
//         }, 1000)
//         return 0
//     } else {
//         EndGame.style.visibility = "hidden"
//     }
//     setTimeout(() => {
//         Ansewr(Data)
//     }, 1000)
// }
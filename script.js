/**
 * Created by Aayush Jadhav, as learnt from freeCodeCamp.org's YouTube tutorial by Ania Kubow.
 * Frogger, without images.
 */

//HTML elements
const timeLeftH3 = document.querySelector("#time-left")
const resultH3 = document.querySelector("#result")
const startBtn = document.querySelector("#start-btn")
const squares = document.querySelectorAll(".grid div")
const leftLogs = document.querySelectorAll(".log-left")
const rightLogs = document.querySelectorAll(".log-right")
const leftCars = document.querySelectorAll(".car-left")
const rightCars = document.querySelectorAll(".car-right")

//width of grid.
const width = 9

//Timer
let timeLeft = 20

//Index of square on which frog is present.
let currentIndex = 0

//Initialised timer ID.
let timerID = null

//Function that starts game.
function startGame() {
    //Resetting h3's
    resultH3.innerHTML = " "
    timeLeft = 20
    timeLeftH3.innerHTML = timeLeft

    //Bringing back / placing frog on starting block.
    if (currentIndex != 85) {
        currentIndex = 85
        squares[currentIndex].classList.add('frog')
    }

    addEventListener('keyup', moveFrog)
    timerID = setInterval(move, 1000)
}

//Function that handles keyboard event for 'moving' frog
function moveFrog({ key }) {
    squares[currentIndex].classList.remove("frog")

    switch (key) {
        case "w":
            if (currentIndex - width >= 0) currentIndex -= width
            break
        case "s":
            if (currentIndex + width < width * 10) currentIndex += width
            break
        case "a":
            if (currentIndex % width != 0 || currentIndex != 0) currentIndex -= 1
            break
        case "d":
            if (currentIndex % width < width - 1) currentIndex += 1
            break
    }

    squares[currentIndex].classList.add("frog")
}

startBtn.addEventListener('click', startGame)

//Function that makes logs & cars 'move' and checks result, every 1 second.
function move() {
    //Moving logs to the left.
    /**
     * This is done by checking class of the 'log', which is of 'leftLogs' array, then removing that class and adding class of next 'log' to left.
     * E.g. if class of the 'log' is l1, then that class i.e. l1 is removed and class of next 'log' to left i.e. l2 is added.
     * This makes it seem as if it is moving towards left.
     */
    leftLogs.forEach(log => {
        switch (true) {
            case log.classList.contains("l1"):
                log.classList.remove("l1")
                log.classList.add("l2")
                break
            case log.classList.contains("l2"):
                log.classList.remove("l2")
                log.classList.add("l3")
                break
            case log.classList.contains("l3"):
                log.classList.remove("l3")
                log.classList.add("l4")
                break
            case log.classList.contains("l4"):
                log.classList.remove("l4")
                log.classList.add("l5")
                break
            case log.classList.contains("l5"):
                log.classList.remove("l5")
                log.classList.add("l1")
                break
        }
    })

    //Moving logs to the right.
    /**
     * This is done by checking class of the 'log', which is of 'rightLogs' array, then removing that class and adding class of next 'log' to right.
     * E.g. if class of the 'log' is l2, then that class i.e. l2 is removed and class of next 'log' to right i.e. l1 is added.
     * This makes it seem as if it is moving towards right.
     */
    rightLogs.forEach(log => {
        switch (true) {
            case log.classList.contains("l2"):
                log.classList.remove("l2")
                log.classList.add("l1")
                break
            case log.classList.contains("l1"):
                log.classList.remove("l1")
                log.classList.add("l5")
                break
            case log.classList.contains("l3"):
                log.classList.remove("l3")
                log.classList.add("l2")
                break
            case log.classList.contains("l4"):
                log.classList.remove("l4")
                log.classList.add("l3")
                break
            case log.classList.contains("l5"):
                log.classList.remove("l5")
                log.classList.add("l4")
                break
        }
    })

    //Moving cars to the left.
    /**
     * This is done by checking class of the 'car', which is of 'leftCars' array, then removing that class and adding class of next 'car' to left.
     * E.g. if class of the 'car' is c1, then that class i.e. c1 is removed and class of next 'car' to left i.e. c2 is added.
     * This makes it seem as if it is moving towards left.
     */
    leftCars.forEach(car => {
        switch (true) {
            case car.classList.contains("c1"):
                car.classList.remove("c1")
                car.classList.add("c2")
                break
            case car.classList.contains("c2"):
                car.classList.remove("c2")
                car.classList.add("c3")
                break
            case car.classList.contains("c3"):
                car.classList.remove("c3")
                car.classList.add("c1")
                break
        }
    })

    //Moving cars to the right.
    /**
     * This is done by checking class of the 'car', which is of 'rightCars' array, then removing that class and adding class of next 'car' to right.
     * E.g. if class of the 'car' is c2, then that class i.e. c2 is removed and class of next 'car' to right i.e. c1 is added.
     * This makes it seem as if it is moving towards right.
     */
    rightCars.forEach(car => {
        switch (true) {
            case car.classList.contains("c2"):
                car.classList.remove("c2")
                car.classList.add("c1")
                break
            case car.classList.contains("c3"):
                car.classList.remove("c3")
                car.classList.add("c2")
                break
            case car.classList.contains("c1"):
                car.classList.remove("c1")
                car.classList.add("c3")
                break
        }
    })

    //Subtracting timeLeft by 1.
    timeLeft--
    timeLeftH3.innerHTML = timeLeft

    checkResult()
}

//Checking result, win or lose.
function checkResult() {
    //If lose.
    if (squares[currentIndex].classList.contains("c1") ||
        squares[currentIndex].classList.contains("l4") ||
        squares[currentIndex].classList.contains("l5") ||
        timeLeft == 0)
    {
        //Changing h3 of result.
        resultH3.innerHTML = "You Lose!"
        //Removing 'frog' class from the current square.
        squares[currentIndex].classList.remove("frog")
        //Removing Event Listener.
        window.removeEventListener('keyup', moveFrog)
        clearInterval(timerID)
    }

    //If win.
    if (squares[currentIndex].classList.contains("ending-block")) {
        resultH3.innerHTML = "You Win!"
        squares[currentIndex].classList.remove("frog")
        window.removeEventListener('keyup', moveFrog)
        clearInterval(timerID)
    }
}
class Plane {

    #planeNode = document.getElementById("");
    #mapNode = document.getElementById("");

    // plane position
    x = 0;
    y = 0;

    #rocketNodes = []
    #firesPoint = []
    #directions = []
    constructor(mapNodeId, planeNodeId) {
        this.#mapNode = document.getElementById(mapNodeId);
        this.#planeNode = document.getElementById(planeNodeId);

        setInterval(async () => {
            this.#updatePlanePoints()
        }, 30);
        setInterval(() => {
            this.fireRocket()
            this.removeAdditionalRockets()
        }, 500);
    }

    #updatePlanePoints() {

        let sensivity = 5;


        // authorized area
        const [x, y] = [[5, 445], [0, -440]]


        // Checking the authorized area
        if (this.x > x[1]) {
            this.stopMovement("right")
        }
        if (this.x < x[0]) {
            this.stopMovement("left")
        }
        if (this.y < y[1]) {
            this.stopMovement("top")
        }
        if (this.y > y[0]) {
            this.stopMovement("bottom")
        }

        // update x,y
        this.#directions.includes("right") && (this.x += sensivity + 2)
        this.#directions.includes("bottom") && (this.y += sensivity)
        this.#directions.includes("top") && (this.y -= sensivity)
        this.#directions.includes("left") && (this.x -= sensivity + 2)

        // update plan node points
        this.#planeNode.style.transform = `translate(${this.x}px,${this.y}px)`;
    }

    move(direction) {
        if (!this.#directions.includes(direction))
            this.#directions.push(direction)
    }

    stopMovement(direction) {
        let filteredDirections = this.#directions.filter(item => item != direction)
        this.#directions = filteredDirections
    }

    removeAdditionalRockets() {
        let child = this.#planeNode[0]
        if (child && getComputedStyle(child).display == "none") {
            this.#planeNode.shift()
            this.#mapNode.removeChild(child)
        }
    }

    removeRocket(rocketNode) {
        this.#rocketNodes.shift()
        this.#mapNode.removeChild(rocketNode)
    }

    fireRocket() {
        const rocketNode = document.createElement("div")
        rocketNode.classList.add("rocket")
        rocketNode.style.left = `${this.x}px`;
        rocketNode.style.transform = `translateY(${this.y}px)`;
        this.#firesPoint.push({ x: this.x, y: this.y })
        this.#mapNode.appendChild(rocketNode)
        this.#rocketNodes.push(rocketNode)
    }

}

class Virus {
    #mapNode = document.getElementById("");
    #virusNodes = [];

    constructor(mapNodeId) {
        this.#mapNode = document.getElementById(mapNodeId);
        setInterval(() => {
            this.fire()
            this.#removeAdditionalViruses()
        }, 300);
    }

    #removeAdditionalViruses() {
        let child = this.#virusNodes[0]
        if (child && getComputedStyle(child).display == "none") {
            this.#virusNodes.shift()
            this.#mapNode.removeChild(child)
        }
    }

    removeViruse(virusNode) {
        this.#virusNodes.shift()
        this.#mapNode.removeChild(virusNode)
    }

    fire() {
        const virusNode = document.createElement("div")
        virusNode.classList.add("virus")
        virusNode.style.left = `50px`;
        virusNode.style.left = `${Math.floor(Math.random() * 445)}px`;
        this.#mapNode.appendChild(virusNode)
        this.#virusNodes.push(virusNode)
    }
}



// classes
const planeClass = new Plane("Map", "Plane")
const virusClass = new Virus("Map")


// dependency injection
class DI {
    #nodes = [[], []]
    constructor() {
        setInterval(async () => {
            this.updateNodes()
            await this.checkVirusDestruction()
        }, 200);
    }

    updateNodes() {
        this.#nodes = [document.querySelectorAll(".rocket"), document.querySelectorAll(".virus")]
    }

    checkVirusDestruction() {
        this.#nodes[0].forEach(rocket => {
            this.#nodes[1].forEach(virus => {
                let distanceElements = this.distanceCalculation(virus, rocket)
                if (distanceElements < 35) {
                    virusClass.removeViruse(virus)
                    planeClass.removeRocket(rocket)
                }
            })
        })
    }

    distanceCalculation(el1, el2) {
        let distance;
        const x1 = el1.offsetTop;
        const y1 = el1.offsetLeft;
        const x2 = el2.offsetTop;
        const y2 = el2.offsetLeft;
        const xDistance = x1 - x2;
        const yDistance = y1 - y2;

        distance = Math.sqrt(
            (xDistance * xDistance) + (yDistance * yDistance)
        );
        return distance
    }
}

(()=>{
    new DI("Map")
})()





const getDirectionStrWithEventCode = (event) => {
    let directionTranslator = {
        37: "left",
        39: "right",
        38: "top",
        40: "bottom"
    }[event.keyCode]

    return directionTranslator
}



// event listeners
document.addEventListener('keydown', function (event) {
    let direction = getDirectionStrWithEventCode(event)
    direction && planeClass.move(direction);
}, true);


document.addEventListener('keyup', function (event) {
    let direction = getDirectionStrWithEventCode(event)
    direction && planeClass.stopMovement(direction)
}, true);
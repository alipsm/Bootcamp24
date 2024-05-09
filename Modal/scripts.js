
let modal_visible= false;


class Modal{
    #modalNode;
    
    constructor(modalId){
        this.#modalNode=document.getElementById(modalId)
    }

    setVisible=(status)=>{
        status?this.#toggleToShow():this.#toggleToHidden()
    }
    
    #toggleToHidden=()=>{
        this.#modalNode.style.opacity=0
        setTimeout(() => {
            this.#modalNode.style.display="none"
        },200);
    }

    #toggleToShow=()=>{
        this.#modalNode.style.display="flex"
        setTimeout(() => {
            this.#modalNode.style.opacity=1
        });
    }
}

const modal = new Modal("Modal")

function signUp() {
    modal.setVisible(false)
    setMessage("Congratulations, you've entered boot camp")
}

function setModalVisibility(status) {
    modal.setVisible(status)
}


function setMessage(text) {
    const messageNode = document.getElementById("Message")
    messageNode.style.display="inline-block"
    messageNode.innerText=text
}
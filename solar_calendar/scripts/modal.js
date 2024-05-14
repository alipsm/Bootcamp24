export class Modal{
    #modalNode=document.getElementById("");
    
    constructor(modalId){
        this.#modalNode=document.getElementById(modalId)
        
        this.#modalNode.querySelector(`#Accept-Btn`).addEventListener("click",()=>{
         this.setVisible(false)
        })
    }

    setVisible=(status)=>{
        status?this.#toggleToShow():this.#toggleToHidden()
    }

    setTitle=(text)=>{
        let titleNode = this.#modalNode.querySelector(`main h2`)
        titleNode.innerHTML=text
    }

    setContent=(text)=>{
        let contentNode = this.#modalNode.querySelector(`main p`)
        contentNode.innerHTML=text
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


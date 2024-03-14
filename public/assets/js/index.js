class NavbarEffect {

    burgerMenu = document.getElementsByClassName("burger-icon")[0];
    itemsNav = document.getElementsByClassName("nav-items")[0];

    init = () => {
        this.burgerMenu.addEventListener("click", () => {
            if(this.itemsNav.classList.contains("hide")){
                this.itemsNav.classList.add("show")
                this.itemsNav.classList.remove("hide")
            }else{
                this.itemsNav.classList.add("hide")
                this.itemsNav.classList.remove("show")
            }
        })  
    }

    transformBurgerIcon = () => {
        if(this.burgerMenu.classList.contains("fa-bars")){
            this.burgerMenu.classList.replace("fa-bars", "fa-xmark")
        }else{
            this.burgerMenu.classList.replace("fa-xmark", "fa-bars")
        }
    }

}

let navbarEffect = new NavbarEffect();

navbarEffect.init();
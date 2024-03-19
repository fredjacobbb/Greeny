class NavbarEffect {

    burger = document.getElementsByClassName("burger-icon")[0];
    cross = document.getElementsByClassName("cross-icon")[0];
    menu = document.getElementsByClassName("menu")[0];
    search = document.getElementsByClassName("search-bar")[0];

    run = () => {
        if(this.burger.classList.contains("hide")){
            this.burger.classList.remove("hide");
            this.cross.classList.add("hide");
            this.menu.classList.add("hide-menu")
        }else{
            this.burger.classList.add("hide");
            this.cross.classList.remove("hide");
            this.menu.classList.remove("hide-menu")

        }
    }

    runSearch = () => {
        if(this.search.classList.contains("hide")){
            this.search.classList.remove("hide");
        }else{
            this.search.classList.add("hide")
        }
    }
     
}

let navbarEffect = new NavbarEffect();
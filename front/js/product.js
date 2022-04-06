let link = window.location.href;
let url = new URL(link);
let productId = url.searchParams.get("id");


const selectColors = document.querySelector("#colors")
const selectQuantity = document.querySelector("#quantity")

productDisplay();

//récupération d'un article dans la liste
async function fetchProduct (productId) {
    let  productData = await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => { return response.json();})
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
    console.table(productData);
    return  productData;
}

async function productDisplay () { 
    let productData = fetchProduct (productId);
    productData.then(async function (productAPI) {
        let productData = await productAPI
            
            // Insertion du titre de la page
            let pageTitle = document.querySelector("title")
            pageTitle.innerText= `${productData.name}`;

            // Insertion de l'image
            const img = document.createElement("img");
            img.src = `${productData.imageUrl}`;
            img.alt = `${productData.altTxt}`;
            document.querySelector(".item__img").appendChild(img);
    
            // Modification du titre "h1"
            let name = document.getElementById("title");
            name.innerText = `${productData.name}`;

            // Modification du prix et quantité
            let quantity = document.querySelector("#quantity");
            quantity.value = "1";

            document.getElementById("price").innerText = `${productData.price}`;

            // Modification de la description
            document.getElementById("description").innerText = `${productData.description}`;

            // Insertion des options de couleurs
            let select = document.getElementById("colors")
            productData.colors.forEach((color) => {
                let color_option = document.createElement("option");
                color_option.innerHTML =`${color}`;
                color_option.value = `${color}`;
                select.appendChild(color_option);

        });
            addBasket(productData)
    })
};
         
async function addBasket(productData) {

    let boutonAdd = document.getElementById("addToCart");
    

    boutonAdd.addEventListener("click", () => {
    //validation du produit

        if(selectQuantity.value > 0 && selectColors.value != 0 && selectQuantity.value <= 100 && selectQuantity.value > 0) {
        console.log("produit valide")

            
            //local storage    
            let productBoard = JSON.parse(localStorage.getItem("product"))
            
            let colorSelected = selectColors.value;
            let quantitySelected = selectQuantity.value;

            const productparam = {
                _id: productId,
                color: colorSelected,
                quantity: Number(quantitySelected),
            };
               
            //creation du produit dans le localstorage

        if (productBoard) {
            //Vérification des élément du locale storage
            const productFind = productBoard.find((el) => el._id === productId && el.color === colorSelected);

                //Si le produit commandé est déjà dans le panier
            if (productFind) {
                let changeQuantite =
                parseInt(productparam.quantity);
                productFind.quantity = changeQuantite;
                localStorage.setItem("product", JSON.stringify(productBoard));
                // pop-up
                alert(`la quantité de votre commande de ${productData.name} (${colorSelected}) a bien été changer par ${quantitySelected} .`),
                console.log("change-quantity")
                console.table(productBoard);
            } 
                //Si le produit commandé n'est pas dans le panier
            else {
                productBoard.push(productparam);
                localStorage.setItem("product", JSON.stringify(productBoard));
                // pop-up
                let alert = confirm(`Votre commande de ${quantitySelected} ${productData.name} ${colorSelected} a bien été ajouter au panier, voulez-vous consulter votre panier ?`);
                    if (alert == true) {
                        window.location = "./cart.html";
                    }
                console.log("create-article-in-lovalstorage")
                console.table(productBoard);
            }
                //Si le panier est vide
        }
            else {
                productBoard = [];
                productBoard.push(productparam);
                localStorage.setItem("product", JSON.stringify(productBoard));
                // pop-up
                let alert = confirm(`Votre commande de ${quantitySelected} ${productData.name} ${colorSelected} a bien été ajouter au panier, voulez-vous consulter votre panier ?`);
                    if (alert == true) {
                           window.location = "./cart.html";
                    }
                console.log("create-article-in-lovalstorage")
                console.table(productBoard);
            }
}

//echec de la validation du produit

else {
    console.log("produit non valide")
    alert(`Oups!😓, ajouter une couleur et une quantité entre (1 - 100) pour comfimer votre ${productData.name}, merci de réessayer 😅.`)
}
})};
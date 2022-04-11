//appel du localstorage
let productBoard = JSON.parse(localStorage.getItem("product"));
console.table(productBoard)

//Récupération prix et quantité totale
const productTotalPrice = document.getElementById("totalPrice");
const productTotalQuantity = document.getElementById("totalQuantity");

//Création des expressions régulières
let myRegex = new RegExp(/^[a-zA-Z-\sùéèàç_]+$/);
let myRegexEmail = new RegExp(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i);
//récupération des champs

let inputfirstName = document.getElementById("firstName");
let inputlastName = document.getElementById("lastName");
let inputaddress = document.getElementById("address");
let inputcity = document.getElementById("city");
let inputemail = document.getElementById("email");


function getProduct (_id) {
    let  Data = fetch(`http://localhost:3000/api/products/${_id}`)
    .then((response) => { return response.json();})
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
    return  Data;
}

//Déclaration de mes 3 fonction principale.
panierDisplay();
form();
postProductForm();
//-----------------------------------------

async function panierDisplay() {

    let apiUrlImage = "";
    let apiAltText = "";
    let apiProductName = "";
    let apiProductPrice = 0;

if(productBoard == null || productBoard == 0){
    const cartItems = document.getElementById("cart__items");
        const article = document.createElement("article");
        article.className = "cart__item";
        cartItems.appendChild(article);

        const h2 = document.createElement("h2");
        h2.innerText = "Ajouter des articles à votre panier.";
        cartItems.appendChild(h2);

        let defaulttotalPrice = document.getElementById("totalPrice")
        defaulttotalPrice.innerText = "0";

        let defaulttotalQuantity = document.getElementById("totalQuantity")
        defaulttotalQuantity.innerText = "0";
}
else{
//Utilisation du locale storage pour affiché les élément du panier

for (let product of productBoard){
        //console.table(product._id);

//creation d'élément dans le HTML si le panier contient des éléments

    const cartItems = document.getElementById("cart__items");

    const article = document.createElement("article");
    article.className = "cart__item";
    article.dataset.id = `${product._id}`;
    article.dataset.color = `${product.color}`;
    cartItems.appendChild(article);

//Utilisation de fetch pour affiché que les article utiliser dans le panier (data)

    let result = await getProduct(product._id);
    //console.log(result);

    apiUrlImage = result.imageUrl;
    apiAltText = result.altTxt;
    apiProductName = result.name;
    apiProductPrice = result.price;


    const cartItemImg = document.createElement("div");
    cartItemImg.className = "cart__item__img";
    article.appendChild(cartItemImg);

    const img = new Image ;
    img.className = "imgKanap"
    img.src = `${apiUrlImage}`;
    img.alt = `${apiAltText}`;
    cartItemImg.appendChild(img);
          
    const cartItemContent = document.createElement("div");
    cartItemContent.className = "cart__item__content";
    article.appendChild(cartItemContent);
            
    const cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.className = "cart__item__content__description";
    cartItemContent.appendChild(cartItemContentDescription);

    const h2 = document.createElement("h2");
    h2.innerText = `Nom : ${apiProductName}`;
    cartItemContentDescription.appendChild(h2);

    const p = document.createElement("p");
    p.innerText = `Couleur : ${product.color}`;
    cartItemContentDescription.appendChild(p);

    const price = document.createElement("p");
    price.className = "price";
    price.innerText = apiProductPrice + "€";
    cartItemContentDescription.appendChild(price);

    const cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.className = "cart__item__content__settings";
    article.appendChild(cartItemContentSettings);

    const cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    const quantityArticle = document.createElement("p");
    quantityArticle.innerText = "Quantité :";
    cartItemContentSettingsQuantity.appendChild(quantityArticle);
            
    const kanapQuantity = document.createElement("input");
    kanapQuantity.type = "number";
    kanapQuantity.className = "itemQuantity";
    kanapQuantity.name = "itemQuantity";
    kanapQuantity.min = "1";
    kanapQuantity.max = "100";
    kanapQuantity.value = `${product.quantity}`;
    cartItemContentSettingsQuantity.appendChild(kanapQuantity);
            
    const cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    const deletekanap = document.createElement("p");
    deletekanap.className = "deleteItem";
    deletekanap.innerText = "Supprimer";
    deletekanap.dataset.id = `${product._id}`;
    deletekanap.dataset.color = `${product.color}`;
    cartItemContentSettingsDelete.appendChild(deletekanap);
                
    }
    modifyCartItemQuantity()
    removeProduct()
    displayTotal()
    } 
}

async function displayTotal(){
    let price = 0;
    let quantity = 0;
    for (let item of productBoard){
        let product = await getProduct(item._id);
        price += product.price * item.quantity;
        quantity += item.quantity;
    }

    productTotalPrice.innerText = price;
    productTotalQuantity.innerText = quantity;
    
}

//fonction qui retourne identifiant et la couleur du produit
function getCartItem(e){
    let id = e.target.closest('article').getAttribute('data-id');
    let color = e.target.closest('article').getAttribute('data-color');
    return [id, color];
}

//changement de la quantité dans localstorage
function modifyCartItemQuantity() {
    let quantityModif = document.querySelectorAll(".itemQuantity");

    if(quantityModif.length != 0) {
        for (let j = 0; j < quantityModif.length; j++){
            quantityModif[j].addEventListener("change" , (event) => {
                event.preventDefault();

                let quantiteModif = parseInt(event.target.value, 10);
                let [idP, colorP] = getCartItem(event);
                    

                if (event.target.classList.contains('itemQuantity') && quantiteModif <= 100 && quantiteModif > 0) {
                    let resultFind = productBoard.find((el) => el._id == idP && el.color == colorP);
                    productBoard = productBoard.filter( el => el._id !== idP || el.color !== colorP);
                    resultFind.quantity = quantiteModif;
                    productBoard.push(resultFind);
                    localStorage.setItem("product", JSON.stringify(productBoard));
                }else{
                    alert("Aïe! aïe! aïe!🤯 Veillez mettre une quantité entre (1 - 100) 🤕")
                    console.log("Quantity non valide")

                }
                displayTotal()
            });
        }
    }
}
//suppression de produit dans localstorage
function removeProduct() {
    
    let boutonsDelete = document.querySelectorAll(".deleteItem");
            //console.log(boutonsDelete);

        if(boutonsDelete.length != 0){
            for (let j = 0; j < boutonsDelete.length; j++){
                boutonsDelete[j].addEventListener("click" , (event) => {
                    event.preventDefault();
           
                    let [idDelete, colorDelete] = getCartItem(event);

                    if (event.target.classList.contains('deleteItem')){
                        productBoard = productBoard.filter( el => el._id !== idDelete || el.color !== colorDelete );
                        localStorage.setItem("product", JSON.stringify(productBoard));
                        event.target.closest('article').remove();
                    }
                    displayTotal()
                });
            }
        }          
}
//Vérification du formulaire

async function form() {
    
let forms = document.querySelector(".cart__order__form")

forms.addEventListener("click", function () {

if (productBoard != null && productBoard != 0) {

    //Vérification du firstName

    inputfirstName.addEventListener("input", function () {
                        
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
                    
            if(inputfirstName.value == "" ) {
                firstNameErrorMsg.innerText = "" ;  
            }
            else if (myRegex.test(inputfirstName.value) == true) {
                firstNameErrorMsg.innerText = "Le Prénom est correcte" ;
                firstNameErrorMsg.style.color = "#dbffe5";
                true
            }
            else if (myRegex.test(inputfirstName.value) == false) {
                firstNameErrorMsg.innerText = "Le prénom doit comporter des lettres, des tirets uniquements." ;
                firstNameErrorMsg.style.color = "#fbbcbc";
            }
})

//Vérification du lastName
            
inputlastName.addEventListener("input", function () {
                  
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
                
        if(inputlastName.value == "" ) {
            lastNameErrorMsg.innerText = "" ;  
        }
        else if(myRegex.test(inputlastName.value) == true) {
            lastNameErrorMsg.innerText = "Le Nom est correcte" ;
            lastNameErrorMsg.style.color = "#dbffe5";
            true
        }
        else if(myRegex.test(inputlastName.value) == false) {
            lastNameErrorMsg.innerText = "Le nom doit comporter des lettres, des tirets uniquements." ;
            lastNameErrorMsg.style.color = "#fbbcbc";
        }
})
            
//Vérification d'address
                    
inputaddress.addEventListener("input", function () {
                
    let addressErrorMsg = document.getElementById("addressErrorMsg")
                
        if(inputaddress.value == "" ) {
            addressErrorMsg.innerText = "" ;
        }
        else if(myRegex.test(inputaddress.value) == true) {
            addressErrorMsg.innerText = "L'adresse est correcte" ;
            addressErrorMsg.style.color = "#dbffe5";
            true
        }
        else if(myRegex.test(inputaddress.value) == false) {
            addressErrorMsg.innerText = "L'Adresse doit comporter des lettres, des tirets uniquements." ;
            addressErrorMsg.style.color = "#fbbcbc";
        }
})
            
//Vérification de la ville
            
inputcity.addEventListener("input", function () {
                
    let cityErrorMsg = document.getElementById("cityErrorMsg")
                
        if (inputcity.value == "") {
            cityErrorMsg.innerText = "" ;
        }
        else if (myRegex.test(inputcity.value) == true) {
            cityErrorMsg.innerText = "La Ville est correcte" ;
            cityErrorMsg.style.color = "#dbffe5";
            true
        }
        else if (myRegex.test(inputcity.value) == false) {
            cityErrorMsg.innerText = "La Ville doit comporter des lettres, des tirets uniquements." ;
            cityErrorMsg.style.color = "#fbbcbc";
        }
})

//Vérification de l'email
                    
inputemail.addEventListener("input", function () {
                
    let emailErrorMsg = document.getElementById("emailErrorMsg")
                
        if(inputemail.value == "" ){
            emailErrorMsg.innerText = "" ;
        }
        else if(myRegexEmail.test(inputemail.value) == true) {
            emailErrorMsg.innerText = "L'Email est correcte" ;
            emailErrorMsg.style.color = "#dbffe5";
            true
        }
        else if(myRegexEmail.test(inputemail.value) == false) {
            emailErrorMsg.innerText = "Veuiller saisir un Email valide Exemple:  utilisateur4534@gmail.com" ;
            emailErrorMsg.style.color = "#fbbcbc";
        }
})
 //message si le panier est vide
} else {
    inputfirstName.style.background = "#fbbcbc";
    inputfirstName.placeholder = "⛔️ Panier vide ⛔️";

    inputlastName.style.background = "#fbbcbc";
    inputlastName.placeholder = "⛔️ Panier vide ⛔️";

    inputaddress.style.background = "#fbbcbc";
    inputaddress.placeholder = "⛔️ Panier vide ⛔️";

    inputcity.style.background = "#fbbcbc";
    inputcity.placeholder = "⛔️ Panier vide ⛔️";

    inputemail.style.background = "#fbbcbc";
    inputemail.placeholder = "⛔️ Panier vide ⛔️";
    }
  })
}

//Validation du formulaire avant l'envoie

async function postProductForm() {
        
//Regex pour vérifier le champs avant l'envoie

let boutonorder = document.getElementById("order")

boutonorder.addEventListener(("click"), function (e) {
e.preventDefault();

if (productBoard != null && productBoard != 0) {
                
            
    if(myRegex.test(inputfirstName.value) &&
    myRegex.test(inputlastName.value) &&
    myRegex.test(inputaddress.value) &&
    myRegex.test(inputcity.value) &&
    myRegexEmail.test(inputemail.value) == true
    ) {

        //Creation Contact et products
        
        let productId = [];
        for (let i = 0; i<productBoard.length;i++) {
            productId.push(productBoard[i]._id);
        }
        //console.log(productId);

        const order = {
            contact: {
                firstName: inputfirstName.value,
                lastName: inputlastName.value,
                address: inputaddress.value,
                city: inputcity.value,
                email: inputemail.value,
            },
                products: productId,
            };
                console.table(order)
        
        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json"
                },
            };
//console.table(options)
            
    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        localStorage.clear();
               
        document.location.href = `confirmation.html?id=${data.orderId}`
    })
//message erreur si le formulaire est mal remplie
}else if(myRegex.test(inputfirstName.value) ||
myRegex.test(inputlastName.value) ||
myRegex.test(inputaddress.value) ||
myRegex.test(inputcity.value) ||
myRegexEmail.test(inputemail.value) == false){
    alert(`Oups!😓Veuiller bien remplir le formulaire`)
    //console.log("formulaire non valide")
}}
//message erreur si le panier est vide
else{
        alert(`Oups!😓Veuiller ajouter des articles à votre panier.`)
    }
    })
}
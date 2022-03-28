/*////////////////////////////////  appel du localstorage  ////////////////////////////////////*/

let productBoard = JSON.parse(localStorage.getItem("product"));
//console.log(productBoard)

/*///////////////////////////////  creation d'élément dans le HTML si le panier contient des éléments  ///////////////////////////////*/

async function panierDisplay() {

    if(productBoard){   
       let products = await productBoard;
       //console.log(products);

       products.forEach((product) => {
            //console.log(product);

            const cartItems = document.getElementById("cart__items");

            const article = document.createElement("article");
            article.className = "cart__item";
            article.dataset.id = `${product._id}`;
            article.dataset.color = `${product.color}`;
            cartItems.appendChild(article);

            const cartItemImg = document.createElement("div");
            cartItemImg.className = "cart__item__img";
            article.appendChild(cartItemImg);
          
            const cartItemContent = document.createElement("div");
            cartItemContent.className = "cart__item__content";
            article.appendChild(cartItemContent);
            
            const cartItemContentDescription = document.createElement("div");
            cartItemContentDescription.className = "cart__item__content__description";
            cartItemContent.appendChild(cartItemContentDescription);

            const p = document.createElement("p");
            p.innerText = `Couleur : ${product.color}`;
            cartItemContentDescription.appendChild(p);

            const cartItemContentSettings = document.createElement("div");
            cartItemContentSettings.className = "cart__item__content__settings";
            article.appendChild(cartItemContentSettings);

            const cartItemContentSettingsQuantity = document.createElement("div");
            cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

            const quantityArticle = document.createElement("p");
            quantityArticle.innerText = "Quantité :";
            cartItemContentSettingsQuantity.appendChild(quantityArticle);
            
            let kanapQuantity = document.createElement("input");
            kanapQuantity.id = `Quantity_${product._id}_and_${product.color}`;
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
            deletekanap.id = `Delete_${product._id}_and_${product.color}`;
            cartItemContentSettingsDelete.appendChild(deletekanap);

/*///////////////////////////////////////  appel de l'API pour la creation d'element dans le HTML  //////////////////////////////////////////*/

            get_API(product)

            async function get_API(product) {
                await fetch(`http://localhost:3000/api/products/${product._id}`)
                .then(response => response.json())
                .then(data => {

                const img = new Image ;
                img.src = `${data.imageUrl}`;
                img.alt = `${data.altTxt}`;
                cartItemImg.appendChild(img);
            
                const h2 = document.createElement("h2");
                h2.innerText = `Nom : ${data.name}`;
                cartItemContentDescription.appendChild(h2);
            
                const price = document.createElement("p");
                price.className = "price";
                cartItemContentDescription.appendChild(price);
                //console.log(data)
    
/*///////////////////////////////////////////  calcul du prix total des produits  //////////////////////////////////////////////////*/

               function caculTotalPrice() {
                let maxPrice = `${data.price}` * `${product.quantity}`;
                price.innerText = `${maxPrice} €`;
    
                let arr = document.querySelectorAll(".price");
                                    
                let total = 0;
                for (let i = 0; i < arr.length; i++) {
                if (parseInt(arr[i].innerHTML)) {
                total += parseInt(arr[i].innerHTML);
                                                  
                }}
                let totalQuantity = document.getElementById("totalPrice");
                totalQuantity.innerText = total;
                //console.log(total)
               }

               let boutonsQuantityp = document.querySelectorAll(".itemQuantity");
                
                boutonsQuantityp.forEach((boutonQuantityp) => {boutonQuantityp.addEventListener("change", function () {
                    return caculTotalPrice()
            })})
                   caculTotalPrice()
            })
            };

/*//////////////////////////////////////  changement de la quantité dans localstorage  ////////////////////////////////////////*/ 

            let boutonsQuantity = document.getElementById(`Quantity_${product._id}_and_${product.color}`);
                
            boutonsQuantity.addEventListener("change", function () {
            
            for (i=0; i <productBoard.length; i++){  //productBoard = localstorage
            
            let selectQuantity = document.getElementsByClassName("itemQuantity")[i];
            //console.log(selectQuantity.value);
            
            if(selectQuantity.value <= 100 && selectQuantity.value > 0) {
                productBoard[i].quantity= 0 + parseInt(selectQuantity.value, 10);
                localStorage.setItem("product", JSON.stringify(productBoard));
                console.log("Quantity change");
                
            }
            else{
                alert("Aïe! aïe! aïe!🤯 Veillez mettre une quantité entre (1 - 100) 🤕")
                location.reload()
                console.log("Quantity change err")
            }
        }
            })

/*////////////////////////////////////////  calcul de la quatité total des produits  ///////////////////////////////////////////*/


            function calculQuantityTotale() {
                let arr = document.querySelectorAll(".itemQuantity");
                
                let total = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (parseInt(arr[i].value)) {
                        total += parseInt(arr[i].value)        
                    }
                }
                let totalQuantity = document.getElementById("totalQuantity");
                        totalQuantity.innerText = total;
                        //console.log(total) 
            }
            let boutonsQuantityTotal = document.querySelectorAll(".itemQuantity");   

            boutonsQuantityTotal.forEach((boutonQuantityTotal) => {boutonQuantityTotal.addEventListener("change", function () {
               return calculQuantityTotale()
            })
        })
               calculQuantityTotale()


/*/////////////////////////////////////  suppression de produit dans localstorage  //////////////////////////////////////////*/

            let boutonsDelete = document.getElementById(`Delete_${product._id}_and_${product.color}`);
            //console.log(boutonsDelete);

            boutonsDelete.addEventListener("click", function () {
            
            let totalproductBoard = productBoard.length;  //productBoard = localstorage
            //console.log(totalproductBoard);

            if (totalproductBoard == 1) {
                localStorage.removeItem("product")
                location.reload()
            }
            else{

                productBoard = productBoard.filter(el => el.Product_Delete !== product.Product_Delete);
                localStorage.setItem("product", JSON.stringify(productBoard));
                location.reload();
            }
            })

/*//////////////////////////////////////////  Vérification du formulaire  /////////////////////////////////////////////////////*/

                let forms = document.querySelector(".cart__order__form")

                forms.addEventListener("click", function () {
            
                let myRegex = /^[a-zA-Z-\sùéèàç_]+$/;
                let myRegexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
                /*________________Vérification du firstName________________*/
            
                let inputfirstName = document.getElementById("firstName")
            
                inputfirstName.addEventListener("input", function () {
                    
                let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
            
                    if(inputfirstName.value == "" ) {
                        firstNameErrorMsg.innerText = "" ;  
                    }
                    else if (myRegex.test(inputfirstName.value) == true) {
                        firstNameErrorMsg.innerText = "Le Prénom est correcte" ;
                        firstNameErrorMsg.style.color = "#dbffe5";
                    }
                    else if (myRegex.test(inputfirstName.value) == false) {
                        firstNameErrorMsg.innerText = "😓 Le prénom doit comporter des lettres, des tirets uniquements." ;
                        firstNameErrorMsg.style.color = "#fbbcbc";
                    }
                })

                /*__________________Vérification du lastName__________________*/
            
                let inputlastName = document.getElementById("lastName");
            
                inputlastName.addEventListener("input", function () {
                    
                let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
            
                    if(inputlastName.value == "" ) {
                        lastNameErrorMsg.innerText = "" ;  
                    }
                    else if(myRegex.test(inputlastName.value) == true) {
                        lastNameErrorMsg.innerText = "Le Nom est correcte" ;
                        lastNameErrorMsg.style.color = "#dbffe5";
                    }
                    else if(myRegex.test(inputlastName.value) == false) {
                        lastNameErrorMsg.innerText = "😖 Le nom doit comporter des lettres, des tirets uniquements." ;
                        lastNameErrorMsg.style.color = "#fbbcbc";
                    }
                })
            
                /*___________________Vérification d'address_____________________*/
            
                let inputaddress = document.getElementById("address");
                    
                inputaddress.addEventListener("input", function () {
            
                let addressErrorMsg = document.getElementById("addressErrorMsg")
            
                    if(inputaddress.value == "" ) {
                        addressErrorMsg.innerText = "" ;
                    }
                    else if(myRegex.test(inputaddress.value) == true) {
                        addressErrorMsg.innerText = "L'adresse est correcte" ;
                        addressErrorMsg.style.color = "#dbffe5";
                    }
                    else if(myRegex.test(inputaddress.value) == false) {
                        addressErrorMsg.innerText = "🙄 L'Adresse doit comporter des lettres, des tirets uniquements." ;
                        addressErrorMsg.style.color = "#fbbcbc";
                    }
                })
            
                /*__________________Vérification de la ville__________________*/
            
                let inputcity = document.getElementById("city");
            
                inputcity.addEventListener("input", function () {
            
                let cityErrorMsg = document.getElementById("cityErrorMsg")
            
                    if(inputcity.value == "") {
                        cityErrorMsg.innerText = "" ;
                    }
                    else if(myRegex.test(inputcity.value) == true) {
                        cityErrorMsg.innerText = "La Ville est correcte" ;
                        cityErrorMsg.style.color = "#dbffe5";
                    }
                    else if(myRegex.test(inputcity.value) == false) {
                        cityErrorMsg.innerText = "🤔 La Ville doit comporter des lettres, des tirets uniquements." ;
                        cityErrorMsg.style.color = "#fbbcbc";
                    }
                })
            
                 /*___________________Vérification de l'email___________________*/
            
                let inputemail = document.getElementById("email");
                    
                inputemail.addEventListener("input", function () {
            
                let emailErrorMsg = document.getElementById("emailErrorMsg")
            
                    if(inputemail.value == "" ){
                        emailErrorMsg.innerText = "" ;
                    }
                    else if(myRegexEmail.test(inputemail.value) == true) {
                        emailErrorMsg.innerText = "L'Email est correcte" ;
                        emailErrorMsg.style.color = "#dbffe5";
                    }
                    else if(myRegexEmail.test(inputemail.value) == false) {
                        emailErrorMsg.innerText = "😕 Veuiller saisir un Email valide Exemple:  utilisateur4534@gmail.com" ;
                        emailErrorMsg.style.color = "#fbbcbc";
                    }
                })
            

            /*_________________Validation du formulaire_________________*/

            let boutonorder = document.getElementById("order")

            boutonorder.addEventListener(("click"), function (e) {
            e.preventDefault();

                if(myRegex.test(inputfirstName.value) &&
                myRegex.test(inputlastName.value) &&
                myRegex.test(inputaddress.value) &&
                 myRegex.test(inputcity.value) &&
                myRegexEmail.test(inputemail.value) == true) {
                    
/*///////////////////////////////////////////  Creation Contact et products  /////////////////////////////////////////////////*/

            let productId = []
            productId.push(product._id)
            
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
            console.log(order);
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
                    //console.log(data);
                    localStorage.clear();
                           
                    document.location.href = `confirmation.html?id=${data.orderId}`
                })
                }  
              })
            })
            });
        }

     
/*////////////////////////////////////  creation d'element dans le HTML si panier vide ///////////////////////////////////////////////*/

    else{
        const cartItems = document.getElementById("cart__items");
            const article = document.createElement("article");
            article.className = "cart__item";
            cartItems.appendChild(article);

            const cartItemContent = document.createElement("div");
            article.className = "cart__item__content";
            article.appendChild(cartItemContent);
            
            const cartItemContentDescription = document.createElement("div");
            cartItemContentDescription.className = "cart__item__content__description";
            cartItemContent.appendChild(cartItemContentDescription);

            const h2 = document.createElement("h2");
            h2.innerText = "😅 Ajouter des articles à votre panier.";
            cartItemContentDescription.appendChild(h2);
    }
}

panierDisplay();
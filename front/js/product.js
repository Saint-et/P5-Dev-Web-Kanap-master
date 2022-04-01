

const product = window.location.search.split("?").join("");
//console.log(product);




    


    async function productDisplay () { 
        let productData = await fetchProduct (product);
        //console.log(productData);

        /*_____________________  creation d'element dans le DOM  _________________________*/

        document.title = `${productData.name}`;

        const item__img = document.getElementsByClassName("item__img")[0];
        const img = new Image ;
        img.src = `${productData.imageUrl}`;
        img.alt = `${productData.altTxt}`;
        item__img.appendChild(img);

        document.getElementById("title").innerText = `${productData.name}`;

        let quantity = document.getElementById("quantity");
        quantity.value = "1";

        quantity.addEventListener("change", () => {
            let maxPrice = `${productData.price}` * quantity.value;
            document.getElementById("price").innerText = maxPrice;
        })

        document.getElementById("price").innerText = `${productData.price}`;

        document.getElementById("description").innerText = `${productData.description}`;

        let select = document.getElementById("colors")
       //console.log(select);

       //console.log(productData.colors);

       productData.colors.forEach((color) => {
        //console.log(document.createElement("option"));

        let color_option = document.createElement("option");

        color_option.innerHTML =`${color}`;
        color_option.value = `${color}`;

        select.appendChild(color_option);
        //console.log(color_option);

        });

        let add_cart = document.getElementById("addToCart");
            add_cart.id = `${productData._id}`;

            addbasket(productData)

    };

        productDisplay();
         
       async function addbasket(productData) {
        //console.log(productData);
        let boutonAdd = document.getElementById(productData._id);
        //console.log(bouton);

        boutonAdd.addEventListener("click", () => {
            let productBoard = JSON.parse(localStorage.getItem("product"))
            let selectColors = document.getElementById("colors")
            let selectQuantity = document.getElementById("quantity")

            //console.log(selectColors.value);
            //console.log(selectQuantity.value);
            //console.log(productBoard);
            

            const productparam = Object.assign({}, productData, {
                color: `${selectColors.value}`,
                quantity: `${selectQuantity.value}`,
            });
            
            /*_________________________  validation du produit  _________________________*/

            if(selectQuantity.value > 0 && selectColors.value != 0 && selectQuantity.value <= 100 && selectQuantity.value > 0) {
                console.log("produit valide")
            
            /*_____________________  creation du produit dans le localstorage  _________________________*/

            if(productBoard == null){
                productBoard = []
                productBoard.push(productparam)
                localStorage.setItem("product", JSON.stringify(productBoard));
                let alert = confirm(`${selectQuantity.value} ${productData.name} ${selectColors.value} a bien été ajouter au panier, voulez-vous consulter votre panier 🤔?`);
                if (alert == true) {
                    window.location = "./cart.html";
                }
                console.log("create-article-instorage")
                       
            }

            else{
                    /*_____________________  changement de la quantité du produit  _________________________*/
                    for (i=0; i < productBoard.length; i++){
                    if(productBoard[i]._id == productData._id && productBoard[i].color == selectColors.value){
                        return (
                            productBoard[i].quantity= 0 + parseInt(selectQuantity.value, 10),
                            localStorage.setItem("product", JSON.stringify(productBoard)),
                            productBoard = JSON.parse(localStorage.getItem("product")),
                            alert(`la quantité de ${productData.name} (${selectColors.value}) a bien été changer par ${selectQuantity.value} 🙂.`),
                            console.log("change-quantity")
                        ) 
                    }    
                }
                    /*____________________________  ajout nouveau produit  ____________________________*/
                    for (i=0; i < productBoard.length; i++){
                    if(productBoard[i]._id == productData._id && productBoard[i].color != selectColors.value || productBoard[i]._id != productData._id){
                        return (
                        productBoard.push(productparam),
                        localStorage.setItem("product", JSON.stringify(productBoard)),
                        productBoard = JSON.parse(localStorage.getItem("product")),
                        alert(`${selectQuantity.value} ${productData.name} ${selectColors.value} a bien été ajouter au panier 🙂.`),
                        console.log("new-article")
                        )
                    }
                }
            }
        }

/*//////////////////////////////////////////  echec de la validation du produit  ////////////////////////////////////////*/

        else {
            console.log("produit non valide")
            alert(`Oups!😓, ajouter une couleur et une quantité entre (1 - 100) pour comfimer votre ${productData.name}, merci de réessayer 😅.`)
        }
            
            return (productBoard = JSON.parse(localStorage.getItem("product")));
        })};


const product = window.location.search.split("?").join("");
//console.log(product);




    


    async function productDisplay () { 
        let productData = await fetchProduct (product);
        console.log(productData);

        /*_____________________creation d'element dans le HTML_________________________*/

        document.title = `${productData.name}`;

        const item__img = document.getElementsByClassName("item__img")[0];
        const img = new Image ;
        img.src = `${productData.imageUrl}`;
        img.alt = `${productData.altTxt}`;
        item__img.appendChild(img);

        document.getElementById("title").innerText = `${productData.name}`;

        let quantity = document.getElementById("quantity")

        quantity.addEventListener("click", () => {
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
        let bouton = document.getElementById(productData._id);
        //console.log(bouton);

        bouton.addEventListener("click", () => {
            let productBoard = JSON.parse(localStorage.getItem("product"))
            let selectColors = document.getElementById("colors")
            let selectQuantity = document.getElementById("quantity")

            //console.log(selectColors.value);
            //console.log(selectQuantity.value);
            console.log(productBoard);
            

            const productparam = Object.assign({}, productData, {
                color: `${selectColors.value}`,
                quantity: `${selectQuantity.value}`,
                Product_Delete: `Delete_${productData._id}_and_${selectColors.value}`
            });
            
            /*_____________________validation du produit_________________________*/

            if(selectQuantity.value > 0 && selectColors.value != 0 && selectQuantity.value < 101){
                console.log("produit valide")
            
            /*_____________________creation du produit dans le localstorage_________________________*/

            if(productBoard == null){
                productBoard = []
                productBoard.push(productparam)
                localStorage.setItem("product", JSON.stringify(productBoard));
                let alert = confirm(`🤭" ${selectQuantity.value} ${productData.name} ${selectColors.value} " a été ajouter au panier, voulez-vous consulter votre panier 🤔?`);
                if (alert == true) {
                    window.location = "./cart.html";
                }
                console.log("create-article-instorage")
                       
            }

            else{
                    /*_____________________changement de la quantité du produit_________________________*/
                    for (i=0; i < productBoard.length; i++){
                    if(productBoard[i]._id == productData._id && productBoard[i].color == selectColors.value){
                        return (
                            productBoard[i].quantity= 0 + parseInt(selectQuantity.value, 10),
                            localStorage.setItem("product", JSON.stringify(productBoard)),
                            productBoard = JSON.parse(localStorage.getItem("product")),
                            alert(`🙂la quantité de " ${productData.name} , ${selectColors.value} " a été changer par " ${selectQuantity.value} "🙃`),
                            console.log("change-quantity")
                        ) 
                    }    
                }
                    /*_________________________ajout nouveau produit____________________________*/
                    for (i=0; i < productBoard.length; i++){
                    if(productBoard[i]._id == productData._id && productBoard[i].color != selectColors.value || productBoard[i]._id != productData._id){
                        return (
                        productBoard.push(productparam),
                        localStorage.setItem("product", JSON.stringify(productBoard)),
                        productBoard = JSON.parse(localStorage.getItem("product")),
                        alert(`Cool!😀" ${selectQuantity.value} ${productData.name} ${selectColors.value} " a été ajouter au panier 😁.`),
                        console.log("new-article")
                        )
                    }
                }
            }
        }

/*_________________________________echec de la validation du produit___________________________________*/

        else {
            console.log("produit non valide")
            alert(`Oups!😓, ajouter une couleur et une quantité entre (1 - 100) pour comfimer votre ${productData.name}, merci de réessayer 😅.`)
        }
            
            return (productBoard = JSON.parse(localStorage.getItem("product")));
        })};
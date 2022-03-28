/*___________________________________récupération de la liste des article________________________________________*/
async function fetchkanap () {
    let list_kanap = await fetch("http://localhost:3000/api/products")
    .then((response) => { return response.json();});
    return list_kanap;
}

/*___________________________________récupération d'un article dans la liste________________________________________*/

async function fetchProduct (productId) {
    let  productData = await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => { return response.json();});
    return  productData;
}

/*__________________________________affichage du nombre d'article dans la nav_______________________________________*/

let productquantity = JSON.parse(localStorage.getItem("product"));
//console.log(productquantity)
    let totalboard = [];
    
    if(productquantity){   
       productquantity.forEach((Quantity) => {
        totalboard.push(Quantity.quantity);
    })
    let total = `${eval(totalboard.join("+"))}`;
    let nav = document.querySelector("nav");
            let ul = nav.querySelector("ul");
            let basketLi = ul.querySelectorAll("li")[1];
            basketLi.innerText = `Panier - ${total}`;
            //console.log(totalboard)
           
}
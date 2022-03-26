 /*___________________recuperation de l'ID de commande dans l'adresse_________________*/
 const orderId = window.location.search.split("?").join("");
//console.log(orderId);

let order = orderId.split("id=").join("")
console.log(order);

 /*___________________affichage de l'ID de commande dans la page_________________*/

let orderdisplay = document.getElementById("orderId");
orderdisplay.innerText = (order);

async function kanapDisplay () { 
let list_kanap = await fetchkanap ();
//console.log(list_kanap);

/*//////////////////////  creation d'element dans le HTML  ///////////////////////*/

list_kanap.forEach(kanap => {

const link = document.createElement ("a")
link.href =`./product.html?${kanap._id}`;
document.getElementById("items").appendChild(link)

const article = document.createElement ("article")
link.appendChild(article)

const img = new Image ;
img.src = `${kanap.imageUrl}`;
img.alt = `${kanap.altTxt}`;
article.appendChild(img)

const h3 = document.createElement ("h3")
h3.setAttribute("class", "productName")
h3.innerText = `${kanap.name}`;
article.appendChild(h3)

const p = document.createElement ("p")
p.setAttribute("class", "productDescription")
p.innerText = `${kanap.description}`;
article.appendChild(p)
          
      });   
};

kanapDisplay();
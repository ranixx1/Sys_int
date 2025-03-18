const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal")
const cartCounter = document.getElementById("cart-count")
const addresInput = document.getElementById("adress")
const addressWarn= document.getElementById("address-warn")


let cart = [];

//abrir o modal do carrinho
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"


})
//fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})


menu.addEventListener("click", function(event){

    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton){
        const name = parentButton.getAtributte("data-name")
        const price = parseFloat(parentButton.getAtributte("data-price"))

    }
})

//Função para adicionar no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        //se o item já existe, aumenta apenas a quantidade +1
        existingItem.quantity +=1;

    }else{

    cart.push({
        name,
        price,
        quantity:1,
    })
}
updateCartModal()

}
//Atualizar o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total =0;

    cart.forEach (item=>{
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML=`
        <div>
            <div>
                <p> ${item.name}</p>
                <p>Quantidade: ${item.quantity}</p>
                <p> R$ ${item.price}</p>    
            </div>

        <div>
            <button>
                Remover
            </button>   
            </div>
        </div>
    `

    cartItemsContainer.appendChild(cartItemElement)

    })
    }


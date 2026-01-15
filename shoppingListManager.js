let shoppingList = [
    { name: "Milk", price: 120, quantity: 2 },
    { name: "Bread", price: 80, quantity: 5 },
    { name: "Eggs", price: 30, quantity: 1 }
];

// Add item to the list
function addItem(name, price, quantity) {
    shoppingList.push({ name, price, quantity });
}

// -------------- Remove item from the list --------------

// Remove using filter method
// function removeItem(name) {
//     shoppingList = shoppingList.filter(item => item.name.toLowerCase() !== name.toLowerCase());
// }

// Remove using for loop
function removeItem(name) {
    let find = false;
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].name.toLowerCase() === name.toLowerCase()) {
            shoppingList.splice(i, 1);
            find = true
            break;
        }
    }
    find ? console.log("Removed Successfully") : console.log('Not found')
}

// -------------- Increase Quantity --------------

// Increase quantity using findIndex
// function increaseQuantity(name, amount) {
//     let itemIndex = shoppingList.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
//     if (itemIndex !== -1) {
//         shoppingList[itemIndex].quantity += amount;
//     } else {
//         console.log("Item not found");
//     }
// }

// Increase quantity using for loop
function increaseQuantity(name, quantity) {
    let find = false;
    for (let index = 0; index < shoppingList.length; index++) {
        if (shoppingList[index].name.toLowerCase() === name.toLowerCase()) {
            shoppingList[index].quantity += quantity;
            find = true;
            break;
        }
    }
    find ? console.log("Change Successfully") : console.log('Not found')
}

// Increase quantity using forEach
// function increaseQuantity(name, quantity) {
//     shoppingList.forEach((item) => {
//         if (item.name.toLowerCase() === name.toLowerCase()) {
//             item.quantity += quantity;
//         }
//     })
// }

function calculateTotalCost() {
    let total = 0;
    shoppingList.forEach(item => {
        total += item.quantity * item.price;
    })
    return total;
}


// Test the functions
console.log("List Before Modifications", shoppingList);

addItem("Biscuit", 30, 20);
console.log("List After Adding Biscuit", shoppingList);


removeItem("Milk");
console.log("List After Removing Milk", shoppingList);

increaseQuantity("Eggs", 12);
console.log("List After Increasing Quantity of Eggs", shoppingList);

console.log("Total Cost", calculateTotalCost());

console.log("sfsdf");
function checkBalance(stock) {
    if (stock > 0) {
        console.log("Stock is available");
    } else {
        console.log("Stock is not available");
    }
}

checkBalance(10);
checkBalance(0);
checkBalance(5);



const medicines = [
    "Paracetamol",
"Vitamin C",
"Cough Syrup"];

console.log(medicines[0]);
console.log(medicines.length);

const medi = {
    id: 1, name : "Vion",
    age : 2, grade :"gemi",
    id2 : 3, name1 : "red"
};
console.log(medi.name1);

const medilist = [
    {id : 1, name : "Paracetamol", rate: 253},
    {id : 2, name : "Vitamin c", rate: 1253},
    {id : 3, name : "Cough syrup", rate: 553},
];


for(const item of medilist)
{
    console.log(item.id, " name: ",item.name, " rate: ", item.rate);
    //console($`{item.id}` );
    //console(`${item.id} name: {item.name} rate: {item.rate}` );
}
console.log(medilist[2].name);


function calculateTotal(price, quantity){
    return price * quantity;
}
console.log(calculateTotal(30, 4));

const mdavelist = [
    { name: "Paracetamol", price: 25, stock: 100 },
    { name: "Vitamin C", price: 50, stock: 20 },
    { name: "Cough Syrup", price: 80, stock: 0 },
    { name: "Antacid", price: 30, stock: 5 }
];

const filMlist = mdavelist.filter(s => s.stock < 10);
console.log("filter: ",filMlist);

//map() — transform each item
const maplist = mdavelist.map(n => n.name);
console.log("map ", maplist);

//4. find() — get one matching item

const mediname = mdavelist.find(n => n.name ==="Antacid");
console.log("find: ", mediname);

const medicines1 = [
    { name: "Tablet A", stock: 20 },
    { name: "Tablet B", stock: 3 },
    { name: "Tablet C", stock: 0 }
];


const stocklist = mdavelist.filter(s => s.stock < 5);





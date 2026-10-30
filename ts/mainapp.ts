
class medicineItem{
    constructor(
        public name:string,
        public stock: number,
        public price: number
    ){

    }

    getvalue():number{
        return  this.price * this.stock;
    }

}
console.log("fdsf");
// function calculateTotal1(
//     firstnumer: number,
//     secondnumber: number): number{
//     return firstnumer + secondnumber;
// }
// console.log(calculateTotal1(5,23));

function calculateTotal(
    price: number,
    quantity: number
): number {
    return price * quantity;
}

const total = calculateTotal(30, 4);
console.log(total); // 120

interface medicine{
    id: number;
    name: string;
    stock: number;
    batchNumber?: string;
}

const first: medicine = {
id:1,
name:"vivek",
stock: 4,
batchNumber: "fdf"
}

console.log(first.name);

const second: medicine = {
    id: 2,
    name: "bhide",
    stock: 3
};

console.log(second.stock);

const item = new medicineItem("Paracetamol",100,50);

console.log(item.getvalue());





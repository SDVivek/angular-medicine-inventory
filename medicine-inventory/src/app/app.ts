import { Component, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface Medicine {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface SaleRecord {
  id: number;
  medicineId: number;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  saleDate: string;
}

interface PurchaseRecord {
  id: number;
  medicineId: number;
  medicineName: string;
  supplierName: string;
  quantity: number;
  unitCost: number
  totalCost: number;
  purchaseDate: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  sales: SaleRecord[] = [];

  saleMedicineId: number | null = null;
  saleQuantity: number | null = null;
  saleDate = new Date().toISOString().slice(0,10);
  
  purchases: PurchaseRecord[] = [];
  purchaseMedicineId: number | null = null;
  purchaseSupplierName ='';
  purchaseQuantity: number | null = null;
  purchaseUnitCost: number | null = null;
  purchaseDate = new Date().toISOString().slice(0,10);

  recordSale(): void{
    console.log(this.saleMedicineId, "call method");
    const medicineId = this.saleMedicineId;
    const quantity = this.saleQuantity;
console.log(quantity);

     // Validate the form
    if(medicineId === null
      || quantity === null
      || !Number.isInteger(quantity)
      || quantity <= 0
      || !this.saleDate
    ){
console.log(medicineId);
console.log(quantity);
console.log(!Number.isInteger(quantity));
console.log(!this.saleDate);

      alert('Please enter valid sales details.');
      return;
    }

    // Find the selected medicine
    const medicine = this.medicines.find(m => m.id === medicineId);
    if (!medicine) {
      alert('Please select a valid medicine.');
      return;
    }

      // Check available stock
    if (quantity > medicine.stock) {
      alert(
        `Insufficient stock. Available: ${medicine.stock}`
      );
      return;
    }

     // Calculate bill amount
    const totalAmount = medicine.price * quantity;
    
    // Create the sale record
    const sale: SaleRecord = {
      id: this.sales.length > 0 ? Math.max(...this.sales.map(m => m.id)) + 1 : 1,
       medicineId: medicine.id,
      medicineName: medicine.name,
      quantity: quantity,
      unitPrice: medicine.price,
      totalAmount: totalAmount,
      saleDate: this.saleDate
    };

    // Reduce inventory stock
    this.medicines = this.medicines.map(m => m.id === medicineId ? {...m, stock: m.stock - quantity} : m);

    //save sale in memory
    this.sales = [...this.sales, sale];

      // Clear the form
  this.saleMedicineId = null;
  this.saleQuantity = null;
  this.saleDate = new Date().toISOString().slice(0, 10);

  alert(
    `Sale completed!\nTotal bill: ₹${totalAmount.toFixed(2)}`
  );

  }

  recordPurchase(): void{

  const medicineId = this.purchaseMedicineId;
  const quantity = this.purchaseQuantity;
  const unitCost = this.purchaseUnitCost;
  const supplier = this.purchaseSupplierName.trim();

  if(
      medicineId === null ||
      quantity === null ||
      unitCost === null ||
      !Number.isInteger(quantity) ||
      quantity <= 0 ||
      !Number.isFinite(unitCost) ||
      unitCost <= 0 ||
      !supplier ||
      !this.purchaseDate){
         alert('Please enter valid purchase details.');
    return;
  }

  const medicine = this.medicines.find(m => m.id === medicineId);
  if(!medicine){
    alert('Please select a valid medicine.');
    return;
  }
  const purchase: PurchaseRecord = {
    id: this.purchases.length > 0 ? Math.max(... this.purchases.map(m => m.id)) + 1 : 1,
    medicineId: medicine.id,
    medicineName: medicine.name,
    supplierName: supplier,
    quantity,
    unitCost,
    totalCost: quantity * unitCost,
    purchaseDate: this.purchaseDate
  }

  this.medicines = this.medicines.map(m => m.id === medicineId ? {...m, stock: m.stock + quantity} : m);
  this.purchases = [...this.purchases,purchase];


  this.purchaseMedicineId = null;
  this.purchaseSupplierName = '';
  this.purchaseQuantity = null;
  this.purchaseUnitCost = null;
  this.purchaseDate = new Date().toISOString().slice(0, 10);

  alert('Purchase recorded successfully!');


  }



  medicines: Medicine[] = [
      { id: 1, name: 'Paracetamol', price: 25, stock: 100 },
    { id: 2, name: 'Vitamin C', price: 50, stock: 20 },
    { id: 3, name: 'Cough Syrup', price: 80, stock: 3 }
  ];
  protected readonly title = signal('medicine-inventory');

  searchText = '';

  get filteredMedicines(): Medicine[]{
    return this.medicines.filter(medicine => medicine.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  get lowStockCount(): number {
    //const numberlist = this.numnerarr.map(x => x);
    //console.log(numberlist);
    //console.log(Math.max(...numberlist))

    return this.medicines.filter(medicine => medicine.stock < 10).length;
  }

  //show Form
  newMedicineName = '';
  editingMedicineId: number | null = null;
  newMedicinePrice: number | null = null;
  newMedicineStock: number | null = null;
  showAddForm = false;

  deleteMedicine(id:number) : void{
      const confirmed = confirm(
    'Are you sure you want to delete this medicine?'
  );

  if (!confirmed) {
    return;
  }
    this.medicines = this.medicines.filter(medicine => medicine.id !== id);
    if(this.editingMedicineId === id){
      this.canceMedicine();
    }

  }


  editMedicine(medicine: Medicine): void{
    this.newMedicineName = medicine.name;
    this.newMedicinePrice = medicine.price;
    this.newMedicineStock = medicine.stock;
    this.editingMedicineId = medicine.id;
    this.showAddForm = true;
  }

  canceMedicine() : void{
    this.newMedicineName = '';
    this.newMedicinePrice = null;
    this.newMedicineStock = null;
    this.editingMedicineId = null;
    this.showAddForm = false;
  }

  toggleMedicineForm(): void{
    if(this.showAddForm){
      this.canceMedicine()
    }
    else{
      this.showAddForm= true;
    }
  }

  addMedicine(){
    const name = this.newMedicineName.trim();
    const price = this.newMedicinePrice;
    const stock = this.newMedicineStock;
    if(!name 
      || price === null
      || stock === null
      || !Number.isFinite(price)
    || !Number.isFinite(stock)
    || price <= 0
    || stock <= 0
    || !Number.isInteger(stock)
  ){
console.log("name",name);
console.log("price",price);
console.log("stock",stock);
    alert('Enter a name, a price greater than zero, and a whole-number stock quantity of zero or more.');
      return;
    }
    if(this.editingMedicineId !== null){
      this.medicines = this.medicines.map(
        medicine => medicine.id === this.editingMedicineId ? {...medicine, name,stock,price} : medicine
        )

    }else{
    
    const medicine: Medicine = {
      id: this.medicines.length > 1 ? Math.max(...this.medicines.map(x => x.id)) + 1 : 1,
      name : name,
      stock: stock,
      price: price
    };
    this.medicines = [...this.medicines, medicine];
  }
  this.canceMedicine();
     // Clear the form
   // this.newMedicineName = '';

  }

stockIn(id:number, quantity:number):void{
  console.log(this.medicines);
  console.log("stockIn- id", id, "qua", quantity);
  if(!Number.isInteger(quantity) || quantity <= 0){
    alert('Enter a valid quantity greater than zero.');
    return;
  }
  this.medicines = this.medicines.map(medicine => medicine.id === id 
    ? {...medicine, stock: medicine.stock + quantity} 
    : medicine)
    console.log(this.medicines);
}

stockOut(id: number, quantity: number): void{
  console.log("id", id, "qua", quantity);
  if(!Number.isInteger(quantity) || quantity <= 0){
    alert('Enter a valid quantity greater than zero.');
    return;
  }

  const medicine = this.medicines.find(m => m.id === id);
  if(!medicine)
    return;
console.log(id);
  if(medicine?.stock < quantity){
        alert('Insufficient stock!');
        return;
  }

  this.medicines = this.medicines.map(m => m.id == id ? {...m,stock: m.stock - quantity}: m);
}
  
}

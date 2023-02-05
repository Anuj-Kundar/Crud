import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.scss']
})


export class ProductcrudComponent implements OnInit {

  content:boolean = false;

  ProductArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;


  name: string ="";
  description: string ="";
  price: Number =0;
  quantity: Number =0;

  currentProductID = "";


  constructor(private http: HttpClient, private modalService: NgbModal ) 
  {
    this.getAllProduct();

  }

  ngOnInit(): void {
  }

  getAllProduct()
  { 
    
    this.http.get("http://127.0.0.1:8000/api/product")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.ProductArray = resultData;
    });
  }

  register()
  {
   
    let bodyData = {
      "name" : this.name,
      "description" : this.description,
      "price" : this.price,
      "quantity" : this.quantity
    };

    this.http.post("http://127.0.0.1:8000/api/save",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Registered Successfully")
        this.getAllProduct();
        this.name = '';
        this.description = '';
        this.price  = 0;
        this.quantity  = 0;
    });
  }

  setUpdate(data: any) 
  {
   this.name = data.name;
   this.description = data.description;
   this.price = data.price;
   this.quantity = data.quantity;
   this.currentProductID = data.id;
  }

  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "description" : this.description,
      "price" : this.price,
      "quantity" : this.quantity
    };
    
    this.http.put("http://127.0.0.1:8000/api/update"+ "/"+ this.currentProductID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Registered Updateddd")
        this.getAllProduct();
        this.name = '';
        this.description = '';
        this.price  = 0;
        this.quantity  = 0;
    });
  }



  save()
  {
    if(this.currentProductID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       

  }


  setDelete(data: any)
  {
    
    
    this.http.delete("http://127.0.0.1:8000/api/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Deleted Successfully")
        this.getAllProduct();
   
    });

  }
}
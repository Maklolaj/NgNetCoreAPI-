import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service'


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeeList:any=[]
  ModalTitle:string = "";
  ActivateAddEditEmpComp:boolean = false;
  emp:any;
  constructor(private service:SharedService) {

   }

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp ={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:""
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  closeClick(){
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  editClick(item:any){
    this.emp = item
    this.ModalTitle = "Edit Employee"
    this.ActivateAddEditEmpComp = true;

  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data =>{
      this.EmployeeList = data;
    });
    }

    deleteClick(dataItem:any){
      if(confirm("Are you sure??")){
        this.service.deleteEmployee(dataItem.EmployeeId).subscribe(
          data=>{
            alert(data.toString());
            this.refreshEmpList();
          }
        )
      }

    }

}

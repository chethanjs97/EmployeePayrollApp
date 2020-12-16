let empPayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
const createInnerHtml = ()=>{
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
//if (empPayrollList.length == 0) return;
let innerHtml = headerHtml;
for(const empPayrollData of empPayrollList){
    innerHtml= innerHtml+  
    "<tr>" +
      `<td><img class='profile' src='${empPayrollData._profilePic}'></td>` + 
      "<td>" + empPayrollData._name + "</td>" +
      "<td>" + empPayrollData._gender + "</td>" +
      "<td>" + getDeptHtml(empPayrollData._department) + "</td>" +
      "<td>" + empPayrollData._salary + "</td>" +
      "<td>" + empPayrollData._startDate + "</td>" +
      "<td>" + empPayrollData._note +"</td>" +
      "<td>" +
      `<button onclick=remove('${empPayrollData._id}')><img id='1' alt='delete' src='../assets/delete-black-18dp.svg'></button>` +
      `<button onclick=update('${empPayrollData}')><img id='1' alt='edit' src='../assets/create-black-18dp.svg'></button>` + 
      "</td>" +
      "</tr>"
}
console.log(innerHtml);
 document.querySelector('#table-display').innerHTML=innerHtml;   
}



    let getDeptHtml = (deptList) =>{
       let deptHtml="";
        for(const dept of deptList){
            deptHtml+="<div class='dept-label'>"+dept+"</div>"
        }
        return deptHtml;
    }

    const remove = (node) => {
        let empPayrollData = empPayrollList.find(empData => empData._name == node.id);
        if (!empPayrollData) return;
        const index = employeePayrollList.map(empData => empData._id).indexOf(empData._id);
        employeePayrollList.splice(index, 1);
        localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
        document.querySelector(".emp-count").textContent = empPayrollList.length;
        createInnerHtml();
    }
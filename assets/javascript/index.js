
 // Get all the animated divs
const animatedDivs = document.querySelectorAll('.animated-div');

// Get the viewport height
const viewportHeight = window.innerHeight;

// Listen for the scroll event
window.addEventListener('scroll', function() {
  // Loop through all the animated divs
  for (let i = 0; i < animatedDivs.length; i++) {
    // Get the current div
    const div = animatedDivs[i];

    // Get the div's top position
    const divTop = div.getBoundingClientRect().top;

    // If the div is in the viewport, add the animation class to it
    if (divTop - div.offsetHeight < viewportHeight) {
      div.classList.add('animate');
    }
  }
});



const links = document.querySelectorAll("#scroll-list a");

const firstLink = links[0];
firstLink.addEventListener("click", function(event) {
  event.preventDefault();
  const targetId = this.getAttribute("href");
  const target = document.querySelector(targetId);
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
});


function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}



  const table = document.querySelector("#tbody1");
  const previousPageButton = document.querySelector("#previous-page");
  const nextPageButton = document.querySelector("#next-page");
  const currentPageDisplay = document.querySelector("#current-page");

  const itemsPerPage = 10; 

  let currentPage = 1;

  function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = 0; i < table.rows.length; i++) {
      if (i >= startIndex && i < endIndex) {
        table.rows[i].style.display = "table-row";
      } else {
        table.rows[i].style.display = "none";
      }
    }

    currentPage = page;
    currentPageDisplay.textContent = currentPage;
  }

  previousPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  nextPageButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(table.rows.length / itemsPerPage)) {
      showPage(currentPage + 1);
    }
  });



  var counter = 1;
  setInterval(function() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4) {
      counter = 1;
    }
  }, 5000);

  let sortAsc = true;
  document.getElementById("myTable").querySelector("thead").addEventListener("click", function(e) {
      
    let target = e.target;
    if (target.tagName === "TH" && target.textContent.includes('Item')) {
      let items = Array.from(document.querySelectorAll("#myTable tbody tr"));
      items.sort(function(a, b) {
        let textA = a.querySelector("td").textContent;
        let textB = b.querySelector("td").textContent;
        return sortAsc ? textA.localeCompare(textB) : textB.localeCompare(textA);
      });
      sortAsc = !sortAsc;
      items.forEach(function(item) {
        document.getElementById("tbody1").appendChild(item);
      });
      showPage(1);
      if (sortAsc) {
        document.getElementById("sort-arrow").innerHTML = "&#x25B2;";
      } else {
        document.getElementById("sort-arrow").innerHTML = "&#x25BC;";
      }
    }
  });


            function tableSearch(){
              let input,filter,table,tr,td,i,txtValue;
              
              input = document.getElementById("myInput");
              filter= input.value.toUpperCase();
              table=document.getElementById("myTable");
              tr=table.getElementsByTagName("tr");
              

              for(let i=0; i<tr.length;i++){
                td=tr[i].getElementsByTagName("td")[0];
                
                if(td){
                  txtValue=td.textContent || td.innerText;
                  if(txtValue.toUpperCase().indexOf(filter)> -1){
                    tr[i].style.display="";
                  }
                  else{
                    tr[i].style.display="none";
                  }
                 
                }
              }
            }    


            const firebaseConfig = {
              apiKey: "AIzaSyD69SsOYmR-rS_KsbBRUpUKv3iOvhVrmg8",
              authDomain: "wecollect-f805c.firebaseapp.com",
              projectId: "wecollect-f805c",
              storageBucket: "wecollect-f805c.appspot.com",
              messagingSenderId: "522683178651",
              appId: "1:522683178651:web:65ac0f0ca48b23c760703e",
              measurementId: "G-D3E827B8VT"
            };
  
            firebase.initializeApp(firebaseConfig);
            let db = firebase.firestore();
  
  
  
            function GetAllDataOnce(){
              db.collection("items").get().then((querySnapshot)=>{
                var items=[];
                querySnapshot.forEach(doc => {
                  items.push(doc.data());
                  
                });
                AddAllItemsToTheTable(items);
              });
            }
  
            function GetAllDataRealtime(){
              db.collection("items").onSnapshot((querySnapshot)=>{
                var items = [];
                querySnapshot.forEach(doc => {
                  items.push(doc.data());
                  
                });
                AddAllItemsToTheTable(items);
              });
            }
  
            var num=0;
            var tbodyb= document.getElementById('tbody1');
            var tbodyi=document.getElementById('tbody2');
  
            function AddItemToTable(barcode,item,price,size,store){
              let trow = document.createElement('tr');
              let td1 = document.createElement('td');
              let td2 = document.createElement('td');
              let td3 = document.createElement('td');
              let td4 = document.createElement('td');
              let td5 = document.createElement('td');

              td5.innerHTML=store
              td4.innerHTML = size;
              td3.innerHTML = price;
              td2.innerHTML = item;
              td1.innerHTML= barcode;
     

              trow.appendChild(td1);
              trow.appendChild(td2);
              trow.appendChild(td3);
              trow.appendChild(td4);
              trow.appendChild(td5);
            



              tbodyb.appendChild(trow);
              

            }
            function AddAllItemsToTheTable(list){
              num=0;
              tbodyb.innerHTML= "";
              tbodyi.innerHTML= "";
              list.forEach(element => {
                AddItemToTable(element.Item,element.Size,element.Price,element.Barcode,element.Store);
                showPage(1);
              });
            }
            window.onload = GetAllDataOnce;

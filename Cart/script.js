var arr = [];

function Cart(id, name, price) {
  this.id = id;
  this.name = name;
  this.price = price;
}

function addPrice() {
  var id = document.getElementById("eventId").value;
  var name = document.getElementById("eventName").value;
  var price = document.getElementById("price").value;
  const obj = new Cart(id, name, price);
  arr.push(obj);
  addRow(arr.length);
  document.getElementById("myForm").reset();
}

var example_array = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
};

function addRow(row_no) {
  document.getElementById("result").style.display = "block";
  var table = document.getElementById("table1");
  var row = table.insertRow(-1);
  row.id = `row${row_no - 1}`;
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var temp = document.createElement("SELECT");
  for (index in example_array)
    temp.options[temp.options.length] = new Option(example_array[index], index);
  temp.id = `select${row_no - 1}`;
  temp.onclick = function () {
    calPrice();
  };
  var temp2 = document.createElement("A");
  var t = document.createTextNode("Remove");
  temp2.id = `link${row_no - 1}`;
  temp2.href = `javascript:remove(${row.id})`;
  temp2.appendChild(t);
  cell5.appendChild(temp2);
  cell1.innerHTML = arr[row_no - 1].id;
  cell2.innerHTML = arr[row_no - 1].name;
  cell3.innerHTML = arr[row_no - 1].price;
  cell4.appendChild(temp);
  cell5.appendChild(temp2);
  calPrice();
}

function remove(id) {
  var table = document.getElementById("table1");
  var r = arr.length;
  var destinationArray = Array.from(arr);
  var value = [];
  var k = 0;
  for (var i = 1, row; (row = table.rows[i]); i++) {
    if (id.id === row.id) {
      destinationArray.splice(i - 1, 1);
      continue;
    }
    value[k++] = document.getElementById(`select${i - 1}`).value;
  }
  for (var i = r; i > 0; i--) {
    arr.splice(i - 1, 1);
    document.getElementById("table1").deleteRow(i);
  }
  for (var i = 0; i < destinationArray.length; i++) {
    arr[i] = destinationArray[i];
    addRow(i + 1);
    document.getElementById(`select${i}`).value = value[i];
  }
  calPrice();
}

function calPrice() {
  var q = 0;
  for (var i = 0; i < arr.length; i++)
    q += arr[i].price * document.getElementById(`select${i}`).value;
  document.getElementById("total").innerHTML = `The total cost is ${q}`;
}

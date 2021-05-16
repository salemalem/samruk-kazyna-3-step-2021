function showForm(product) {
  document.getElementById("products").value = product;
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
// Select all openable drawers
const openDrawers = document.querySelectorAll(".open");
const container = document.querySelector(".container");
const closedDrawers = document.querySelectorAll(".close");

openDrawers.forEach(drawer => {
  drawer.addEventListener("click", function() {

    // If the drawer is already open, do nothing
    if (this.classList.contains("active")) return;

    // Mark it as open
    this.classList.add("active");

    // Change drawer style to show it is open
    this.style.backgroundColor = "lightgreen";
    this.style.color = "black";
    this.textContent = "OPEN!";


    // After 3 seconds, close the drawer again
    setTimeout(() => {
      this.classList.remove("active");
      this.style.backgroundColor = "blue";     // back to closed color
      this.style.color = "white";
      this.textContent = "Drawer";             // reset text
      container.style.backgroundColor = "aqua"; // reset cupboard color
    }, 3000);

  
  });
});


closedDrawers.forEach((lockedDrawer) => {
  lockedDrawer.addEventListener("click", function() {

    // If the drawer is already open, do nothing
    if (this.classList.contains("locked")) return;
    
        this.classList.add("shake");

    setTimeout(() => 
        this.classList.remove("shake"), 250);
        this.textContent = "closed!";
        return;
}
    );
  });


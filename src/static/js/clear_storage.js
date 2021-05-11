$(function() {
  main()
});

async function main() {
  let element = document.getElementById("clear-storage")
  if (element) {
    console.log("set click handler")
    element.onclick = () => {
      console.log("clear storage")
      localStorage.clear()
    }
  }
}

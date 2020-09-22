
import Fuse from 'fuse.js';

const searchKeywords = [
   {
        title: "$BASED sCRV",
        link: "/based/scrv",
        tags: ["based", "$based", "scrv", "scurve"]
    },
    {
        title: "$BASED sUSD",
        link: "/based/scrv",
        tags: ["based", "$based", "scrv", "scurve", "susd"]
    },
    {
        title: "Funzone",
        link: "/funzone",
        tags: ["shrimp", "tendies", "yam", "$BASED"]
    },
    {
        title: "Shrimp YFI",
        link: "/shrimp/yfi",
        tags: ["shrimp", "yfi"]
    },
    {
        title: "Shrimp Taco",
        link: "/shrimp/taco",
        tags: ["shrimp", "taco"]
    },
    {
        title: "Y Vaults",
        link : "/yearn/yvault",
        tags : ["yearn", "vault", "yvault", "andre", "cronje", "yusd"]
    }
]

const upKey = 38;
const downKey = 40;
const bKey = 66;
const enterKey = 13;

window.onload = () => {
    const quickEl = document.getElementById("quick");
    const quickInputEl = document.getElementById("quick-input");
    const quickFormEl = document.getElementById("quick-form");
    const quickDropdownEl = document.getElementById("quick-dropdown");
    const fuse = new Fuse(searchKeywords, {
        includeScore: true,
        keys: ["title", "tags", "link"]
    })

    window.addEventListener("keydown", event => {
    // Ctrl/Cmd + B
    if ((event.ctrlKey || event.metaKey) && event.which == bKey) {
        event.preventDefault();
        quickEl.style.display = "block";
        quickInputEl.focus();
    } else if (event.which == 27) {
        event.preventDefault();
        quickEl.style.display = "none";
    }
    })
    quickInputEl.addEventListener("input", (event) => {
        const data = String(event.target.value).toLowerCase();
        quickDropdownEl.innerHTML = fuse.search(data)
            .map(
                d =>
                `<li><a href="${d.item.link}">${d.item.title}</a></li>`
            ).join("");
    })
    let currentIndex = null;
    quickInputEl.addEventListener("keydown", (event) => {
        if (event.which === enterKey) {
            quickDropdownEl.querySelector(".active a").click();
            return;
        }
        const allLi = quickDropdownEl.querySelectorAll("li");
        if (allLi.length === 0) return;
        const itemLength = allLi.length;
        if (event.which === upKey) {
            event.preventDefault();
            allLi.forEach(d => d.classList.remove("active"));
            let selectedEl;
            if(currentIndex === null || currentIndex === 0) {
                selectedEl =  allLi[itemLength - 1];
                currentIndex = itemLength - 1;
            } else {
                const updatedIndex = currentIndex - 1;
                selectedEl = allLi[updatedIndex];
                currentIndex = updatedIndex;
            }
            selectedEl.classList.add("active")
            selectedEl.focus()
        } else if (event.which === downKey) {
            event.preventDefault();
            allLi.forEach(d => d.classList.remove("active"));
            let selectedEl;
            if(currentIndex === null || currentIndex === itemLength - 1) {
                selectedEl = allLi[0];
                currentIndex = 0;
            } else {
                const updatedIndex = currentIndex + 1;
                selectedEl = allLi[updatedIndex];
                currentIndex = updatedIndex;
            }
            selectedEl.classList.add("active")
            selectedEl.focus()
        }
    });
    quickFormEl.addEventListener("submit", (event) => {
        event.preventDefault();
    })
}

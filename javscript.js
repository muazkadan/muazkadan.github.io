
new TypeIt("#home-text-span", {
    strings: "Coding is life",
    speed: 175,
    loop: true,
    loopDelay: 5000
}).go();



const skills = document.querySelectorAll(".resume > div");
const progressBar = document.querySelectorAll(".progress");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry =>{
            entry.target.classList.toggle("show", entry.isIntersecting)
            if(entry.isIntersecting) observer.unobserve(entry.target)
        })
    },
    {
        threshold: 1,
    }
)

skills.forEach(skill =>{
    observer.observe(skill)
})

progressBar.forEach(pb=>{
    observer.observe(pb)
})





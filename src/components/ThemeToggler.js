
export default function ThemeToggler() {

  let theme = "dark"
  // Theme 
  const Colors = [
    { "var": "--clr-n1-to-n8", "dark": "var(--clr-neutral-1)", "ligth": "var(--clr-neutral-8)" },
    { "var": "--clr-n6-to-n1", "dark": "var(--clr-neutral-6)", "light": "var(--clr-neutral-1)" },
    { "var": "--clr-n7-to-n3", "dark": "var(--clr-neutral-7)", "light": "var(--clr-neutral-3)" },
    { "var": "--clr-n1-to-n4", "dark": "var(--clr-neutral-1)", "light": "var(--clr-neutral-4)" },
    { "var": "--clr-n7-to-n4", "dark": "var(--clr-neutral-7)", "light": "var(--clr-neutral-4)" },
    { "var": "--clr-n1-to-p11", "dark": "var(--clr-neutral-1)", "light": "var(--clr-primary-11)" },
    { "var": "--clr-n4-to-p7", "dark": "var(--clr-neutral-4)", "light": "var(--clr-primary-7)" },

    { "var": "--line-clr", "dark": "var(--clr-neutral-5)", "light": "var(--clr-neutral-3)" },
    { "var": "--input-border-clr", "dark": "hsl(0, 0%, 25%)", "light": "hsl(0, 0%, 90%)" }
  ]

  const toggleTheme = () => {

    // Light theme
    if (theme == "dark") {
      theme = "light"
      //document.querySelector("[data-theme-btn]").classList.add("active")

      document.querySelectorAll("[data-theme-btn]").forEach(el => {
        el.classList.add("active")
      })

      // Dark theme  
    } else {
      theme = "dark"
      //document.querySelector("[data-theme-btn]").classList.remove("active")
      document.querySelectorAll("[data-theme-btn]").forEach(el => {
        el.classList.remove("active")
      })
    }
    // Change all colors
    Colors.forEach(clr => {
      document.documentElement.style.setProperty(clr.var, clr[theme])
    })


  }

  return (
    <div className="theme-div flex gap-600">
      <div className="light"></div>

      <button data-theme-btn className="toggle-btn flex" onClick={toggleTheme}>
        <div className="toggle-circle"></div>
      </button>

      <div className="dark"></div>
    </div>
  )
}
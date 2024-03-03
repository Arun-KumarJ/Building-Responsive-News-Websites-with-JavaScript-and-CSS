const apikey='1dd628d465ba40e3a885a0f6a35f7f6c'
const blogContainer = document.getElementById("blog-container");
const searchField= document.getElementById('search-box')
const searchButton= document.getElementById('search-button')
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const currentYear = new Date().getFullYear();


document.getElementById('currentYear').textContent = currentYear;

function toggleDarkMode() 
            {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
            }

const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'true') 
            {
    body.classList.add('dark-mode');
            }

darkModeToggle.addEventListener('click', toggleDarkMode);

async function fetchRandomNews()
    {
        try
            {
                const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apikey}`
                const response = await fetch(apiUrl)
                const data = await response.json()
                return data.articles;

            }
        catch(error)
            {
                console.error("Error fetching random news", error);
                return [];

            }
    }

searchButton.addEventListener("click", async ()=>{
                                                const query = searchField.value.trim()
                                                if(query!=="")
                                                    {
                                                        try
                                                            {
                                                                 const articles = await fetchNewsQuery(query) 
                                                                 displayBlogs(articles)                              

                                                            }
                                                        catch(error)
                                                            {
                                                                 console.log("Error fetching news by query",error)
                                                            }
                                                    }
                                                 }
                                
                             )
async function fetchNewsQuery(query)
                {
                    try
                    {
                        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apikey}`
                        const response = await fetch(apiUrl)
                        const data = await response.json()
                        return data.articles;
        
                    }
                catch(error)
                    {
                        console.error("Error fetching random news", error);
                        return [];
        
                    }
                }

function displayBlogs(articles) 
                {
                    blogContainer.innerHTML = "";
                    articles.forEach(article => {
                        const blogCard = document.createElement("div");
                        blogCard.classList.add("blog-card");
                
                        const img = document.createElement("img");
                        img.alt = article.title;
                        img.onerror = () => {
                            img.src = 'download.jpeg'; 
                                            };
                        img.onload = () => {
                            img.style.display = 'block'; 
                                           };
                        img.style.display = 'none'; 
                        img.src = article.urlToImage;
                
                        const title = document.createElement("h2");
                        title.textContent = article.title;
                
                        const description = document.createElement("p");
                        description.textContent = article.description;
                
                        blogCard.appendChild(img);
                        blogCard.appendChild(title);
                        blogCard.appendChild(description);
                
                        blogCard.addEventListener('click', () => {
                            window.open(article.url, "_blank");
                                    });
                
                        blogContainer.appendChild(blogCard);
                                              });
                }

(async ()=>{
                try
                    {
                        const articles = await fetchRandomNews()
                        displayBlogs(articles)
                    }
                catch(error)
                    {
                        console.log("Error fetching random news",error)
                    }


           }
)()


blogContainer.addEventListener('mouseover', function(event) {
    const target = event.target;
    if (target.tagName === 'P') {
        target.classList.add('show-full');
    }
});


blogContainer.addEventListener('mouseout', function(event) {
    const target = event.target;
    if (target.tagName === 'P') {
        target.classList.remove('show-full');
    }
});

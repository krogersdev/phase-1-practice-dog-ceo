    // console.log('%c HI', 'color: firebrick')
    //Challenge 1
addEventListener('DOMContentLoaded', () => {
   // This function recieves each url(dog), creates img tag, assigns src attr and appends it to the DOM
    function renderURL(url) {    
        let domImg = document.createElement('img')
        domImg.src = url;
        domImg.style.display = 'block';
        document.querySelector('#dog-image-container').appendChild(domImg);
    }

    //Challenge 2  
    function renderBreeds(names) {
        let li = document.createElement('li');
        li.addEventListener('click', changeFont) //EventListener added to change Font when clicked 
        li.innerText = names;
        document.querySelector('#dog-breeds').appendChild(li)
    }

    //Get request to fetch the IMG data after DOM loads
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(jsonObject => (jsonObject.message).forEach(renderURL));  //forEach() sends the Objects(jsonObject.message) one at a time to renderUrl to create our images 
    
    fetchBreeds() // Helper function called to renderBreeds/create list of breeds
    .then((breeds) => { 
        let breedArr =  Object.keys(breeds.message);
        breedArr.forEach((breed) => renderBreeds(breed)); 
    });

    // This HELPER function that fetches the list of breeds. Used on line 24 to fetch breeds to render our list and filterBreeds fucntion to filter the breed list 
    function fetchBreeds() { 
        return fetch("https://dog.ceo/api/breeds/list/all")
         .then(response => response.json())
     }

    // Challenge 3    This function changes the color/style of the element when clicked. I used the renderBreeds function to add to each breed upon creation
    function changeFont(event) {
        event.target.style.color = 'red';
    }

    // Challenge 4 Creating a filter to filter the breeds based on our selection
    function filterBreeds() {
        let dropdownSelector = document.querySelectorAll("#breed-dropdown");   // Select our dropDown of options to select
        dropdownSelector.forEach(element => element.addEventListener("change", (e) => { // forEach of the elems add Evenlistener for our selection 
            let dogUl = document.querySelector('#dog-breeds');  // 
            fetchBreeds()
            .then(response => {
                let breedArr =  Object.keys(response.message);
                let filteredList = breedArr.filter(name => {
                     return (name.startsWith(e.target.value));
                });  
                dogUl.innerHTML = " "               // This hides all of our breeds 
                filteredList.forEach(e => {   // This function now receives our filtered list and sends it to the DOM via the renderBreeds function
                    renderBreeds(e);
                    return console.log(e);
                });
            });
        }));     
    }
    filterBreeds();           
});


    
        
        
        
              


      
const localStorageLibrary = JSON.parse(localStorage.getItem("library"))
let library = localStorage.getItem("library") !== null ? localStorageLibrary : []

let titleInput = document.querySelector('#input_title')
let authorInput = document.querySelector('#input_author')
let pagesInput = document.querySelector('#input_pages')


class Book{
    constructor(title,author,pages,read){
      this.title = title
      this.author = author
      this.pages = pages
      this.read = read
  }
    info() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
    }
}
function getInputBook(){
    let title = titleInput.value
    let author = authorInput.value
    let pages = pagesInput.value
    let read; 
    if(document.querySelector('#input_read').checked){
      read = 'read'
    }
    else{
      read = 'notread'
    }
    return new Book(title, author, pages, read)
}
const updateLocalStorage = () => {
  localStorage.setItem('library', JSON.stringify(library))
}
function addBookToLibrary() {
  // push the new book to library
   library.push(getInputBook())
   console.log(getInputBook())
  // push the book dom
   readLibrary()
    updateLocalStorage()
   }



// change read btn class
let readbtn = document.querySelectorAll('.read_btn')

readbtn.forEach(btn => {
  btn.addEventListener('click',()=>{
    if(btn.classList.contains('notread')){
      btn.classList.remove('notread')
      btn.classList.add('read')
      btn.textContent = 'Read'
    }
    else{
      btn.classList.add('notread')
      btn.classList.remove('read')
      btn.textContent = 'Not Read'
    }
  })
})



//remove card button
let removebtn = document.querySelectorAll('.remove_btn')
removebtn.forEach(btn => {
  btn.addEventListener('click', ()=> btn.parentElement.remove())
})

//button add a book


let addbookslink = document.querySelector('.add')

addbookslink.addEventListener('click',()=>{
  document.querySelector('.addbooks').style.display = 'flex'
  document.querySelector('#overlay').style.display = 'block'

})

// When overlay is clicked close the add books form

let overlay = document.querySelector('#overlay')

overlay.addEventListener('click',()=>{
  document.querySelector('.addbooks').style.display = 'none'
  document.querySelector('#overlay').style.display = 'none'

})

// input submit
let inputsubmit = document.querySelector('#input_submit').addEventListener('click', (e)=>{
  e.preventDefault()
  if(pagesInput.checkValidity() && authorInput.checkValidity() && titleInput.checkValidity()){
  addBookToLibrary()}

})





// TEST VALIDATE
titleInput.addEventListener("input", () => {
  titleInput.setCustomValidity("");
  titleInput.checkValidity();
});

titleInput.addEventListener("invalid", () => {
  if (titleInput.value === "") {
    titleInput.setCustomValidity("Enter the title of the book!");
  } else if(titleInput.validity.tooLong || titleInput.validity.tooShort){
    titleInput.setCustomValidity("The title lenght must be between 5 and 22 longer");
  }
});

authorInput.addEventListener("input", () => {
  authorInput.setCustomValidity("");
  authorInput.checkValidity();
});

authorInput.addEventListener("invalid", () => {
  if (authorInput.value === "") {
    authorInput.setCustomValidity("Enter the author of the book!");
  } else if(authorInput.validity.tooLong || authorInput.validity.tooShort){
    authorInput.setCustomValidity("The author name must be between 5 and 22 longer");
  }
});


pagesInput.addEventListener("input", () => {
  pagesInput.setCustomValidity("");
  pagesInput.checkValidity();
});

pagesInput.addEventListener("invalid", () => {
  if (pagesInput.value === "") {
    pagesInput.setCustomValidity("Enter the number of pages!");
  } else if(pagesInput.validity.rangeOverFlow || pagesInput.validity.rangeUnderFlow){
    pagesInput.setCustomValidity("You can only have books between 40 and 3000 pages longer");
  }
});

const readLibrary = () => {
  let container = document.querySelector(".container")
  while (container.firstChild) {
    container.removeChild(container.firstChild);
    }

 library.forEach(element => {
  //let i = library.length - 1
  const card = document.createElement("div");
  card.classList.add('card')
  document.querySelector('.container').appendChild(card)


  const title = document.createElement('p')
  title.innerText = `${element.title}`
  card.appendChild(title)

  const author = document.createElement('p')
  author.innerText = `${element.author}`
  card.appendChild(author)

  const pages = document.createElement('p')
  pages.innerText = `${element.pages}`
  card.appendChild(pages)

  const read = document.createElement('div')
  read.classList.add('read')
  read.classList.add(element.read)
  read.innerText = element.read == 'read' ? 'Read' : 'Not Read'
  card.appendChild(read)

  const deletebtn = document.createElement('div')
  deletebtn.classList.add('delete')
  deletebtn.innerText = 'Delete'
  card.appendChild(deletebtn)

  read.addEventListener('click',()=>{
    if(read.classList.contains('notread')){
      read.classList.remove('notread')
      read.classList.add('read')
      read.textContent = 'Read'
    }
    else{
      read.classList.add('notread')
      read.classList.remove('read')
      read.textContent = 'Not Read'
    }
  })
  deletebtn.addEventListener('click', ()=> deletebtn.parentElement.remove())
 });
}

readLibrary()
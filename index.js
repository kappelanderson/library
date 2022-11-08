let myLibrary = [];
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

function addBookToLibrary() {
  // push the new book to library
   myLibrary.push(getInputBook())
  // push the book dom
   let i = myLibrary.length - 1
    const card = document.createElement("div");
    card.classList.add('card')
    document.querySelector('.container').appendChild(card)

    const info = document.createElement('p')
    info.innerText = `${myLibrary[i].title}\n${myLibrary[i].author}\n${myLibrary[i].pages}`
    card.appendChild(info)

    const readbtn = document.createElement('button')
    readbtn.classList.add('read_btn')
    readbtn.classList.add(myLibrary[i].read)
    readbtn.innerText = myLibrary[i].read == 'read' ? 'Read' : 'Not Read'
    card.appendChild(readbtn)

    const removebtn = document.createElement('button')
    removebtn.classList.add('remove_btn')
    removebtn.innerText = 'Remove'
    card.appendChild(removebtn)

    readbtn.addEventListener('click',()=>{
      if(readbtn.classList.contains('notread')){
        readbtn.classList.remove('notread')
        readbtn.classList.add('read')
        readbtn.textContent = 'Read'
      }
      else{
        readbtn.classList.add('notread')
        readbtn.classList.remove('read')
        readbtn.textContent = 'Not Read'
      }
    })
    removebtn.addEventListener('click', ()=> removebtn.parentElement.remove())


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

//h1 add a book

let addbookslink = document.querySelector('h1')

addbookslink.addEventListener('click',()=>{
  document.querySelector('.addbooksform').style.display = 'block'
})

// x btn

let xbtn = document.querySelector('.x')

xbtn.addEventListener('click',()=>{
  document.querySelector('.addbooksform').style.display = 'none'
})

// input submit
let inputsubmit = document.querySelector('#input_submit').addEventListener('click', ()=>{
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
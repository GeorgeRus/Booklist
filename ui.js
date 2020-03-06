class Book{
    constructor(title, author, code){
        this.title = title;
        this.author = author;
        this.code = code;
    }
};

class UI{
    constructor(){
        this.clearFields();
    };

    clearFields(){
        document.getElementById("title").value = " ";
        document.getElementById("author").value = " ";
        document.getElementById("bookCode").value = " ";
    };

    display(){
        if(this.validateForm()){
            this.addErrorMessage();
        }else{
            this.addBook();
            this.addSuccessMessage();
        }
    };

    addBook(){
        const book = new Book(titleVal.value, authorVal.value, codeVal.value); //DACA PUN LINIA ASTA AFARA, NU SE INTAMPLA NIMIC, PT CA E BLOCK SCOPED
        this.row = table.insertRow();
        const bookTitle = this.row.insertCell(0);
        const bookAuthor = this.row.insertCell(1);
        const bookCode = this.row.insertCell(2);
        bookTitle.innerText = `${book.title}`;
        bookAuthor.innerText = `${book.author}`;
        bookCode.innerText = `${book.code}`;
        this.removeBook();
    };

    validateForm(){
        let invalidForm = false;
        if(titleVal.value == " " || (authorVal.value == " ") || (codeVal.value == " ")){
            invalidForm = true;
        }
        return invalidForm;
    };

    removeBook(){
        this.removeBtn = this.row.insertCell(3);
        this.removeBtn.innerText = "x";
        this.removeBtn.addEventListener("click", (e) => {
            this.removeElement = e.target.parentElement;
            console.log(e); // aici target-ul e td, iar ca sa sterg tot randul, pun e.target.parentElement(e.target reprezinta td-ul, tar parentElement reprezinta tr-ul)
            this.removeElement.remove();
        })
    };
    
    searchBook(){
        let textValue;
        let searchedBook = searchButton.value;
        let tableRows = table.getElementsByTagName("tr");
        let arrayTableRows = [...tableRows]; //merge si cu Array.from;
        let filter = searchedBook.toUpperCase();
            arrayTableRows.forEach((row, index, arr) => {
                let rowItem = arr[index].getElementsByTagName("td")[0]; //[0] daca pun asta, atunci va cauta numai dupa primul td pt fiecare
                if(rowItem){
                    textValue = rowItem.textContent || rowItem.innerText;
                    if(textValue.toUpperCase().indexOf(filter) > -1){
                        row.style.display = "flex";
                    }else{
                        row.style.display = "none";
                    }
                }
            });
    };

    addErrorMessage(){
        userMessage.style.visibility = "visible";
        userMessage.classList.add("error");
        userMessage.innerText = "Error. Please complete the fields and try again!"
        this.removeUserMessage();
    };

    addSuccessMessage(){
        userMessage.style.visibility = "visible";
        userMessage.classList.remove("error");
        userMessage.classList.add("success");
        userMessage.innerText = "Your book was added succesfully!"
        this.removeUserMessage();
    };

    removeUserMessage(){
        setTimeout(() => {   
            userMessage.style.visibility = "hidden";
        }, 3000)
    };
};

const titleVal = document.getElementById("title");
const authorVal = document.getElementById("author");
const codeVal = document.getElementById("bookCode");
const table = document.getElementsByTagName("table")[0];
const userMessage = document.getElementsByClassName("userMessage")[0];
const searchButton = document.querySelector("#search");
const submitButton = document.getElementById("submit");

const ui = new UI();

submitButton.addEventListener("click", (e) => {  //de ce merge cu click, dar cu submit nu?
    e.preventDefault();
    ui.display();
    ui.clearFields();
    console.log(e); //aici, de exemplu, target-ul este butonul.
    console.log(this); //observa ca aici this e window, pt ca arrow function nu are propriul this
});

searchButton.addEventListener("keyup", () => {
    ui.searchBook();
});




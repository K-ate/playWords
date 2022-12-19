// Изменение бордеров по нажатию кнопок------------------------------------

document.addEventListener('keypress', function(event){

    if(event.shiftKey && ['Q','q', 'Й', 'й'].includes(event.key)){
        let btns = this.querySelectorAll('.but')
        for (let but of btns){
            but.classList.remove('double');
            but.classList.add('dashed');            
        }
    }
    if(event.shiftKey && ['W','w','Ц', 'ц'].includes(event.key) ){
        let btns = this.querySelectorAll('.but')
        for (let but of btns){
            but.classList.remove('dashed');
            but.classList.add('double');
        }
    }
    if(event.shiftKey && ['E','e','У', 'у'].includes(event.key) ){
        let btns = this.querySelectorAll('.but')
        for (let but of btns){
            but.classList.remove('dashed');
            but.classList.remove('double');
        }
    }
    
    
});
// ------------------------------------------------------------------------


// __________________________________первый уровень__________________________________________________________

let count = null;
// let nouns = ['Слон', 'Бег', 'Ложка'];
// let verbs = ['Бегать', 'Прыгаю', 'Ехал', 'Устала'];
// let adjectives = ['Красивый', 'Беговой'];

let nouns = ['Слон', 'Кабачок', 'Танец'];
let verbs = ['Бегать', 'Варить', 'Набрать'];
let adjectives = ['Книжный', 'Авторский', 'Тайный'];

let inpName = document.querySelector('.inp');
let namePlayer = document.querySelector('.namePlayer');
// namePlayer.textContent = inpName.value;

let firstBtn = document.querySelector('#firstBtn');
firstBtn.onclick = firstFunc;

let main = document.querySelector('.main');
// let hedtext = document.querySelector('.hedtext');
let playNameCont = document.querySelector('.playNameCont');
let mainText = document.querySelector('.maintext');
let colText = document.querySelector('.colText');
let taskContainer = document.querySelector('.task');
let wordContainer = document.querySelector('.wordcontainer');
let counter = document.querySelector('.counter');

let start = document.querySelector('#start');
start.onclick = strt;

let next = document.querySelector('#next');
next.onclick = nxt1;

let newPlay = document.querySelector('#newPlay');
newPlay.onclick = nstrt;

let secondLvl = document.querySelector('#secondLvl');
secondLvl.onclick = toSecondLevel;

let colCont = document.querySelector('.colCont');

let again = document.querySelector('#again');
again.onclick = againStrt;

function againStrt(){
    let sure = confirm("Вы уверены, что хотите начать игру заново?");
    if(sure === true){
        thirdLvl.classList.add('none');
        strt();
    }
}

let textComm = document.querySelector('.textComm');

// Функция, которая открывает описание первого уровеня--------------------------------
function firstFunc(){
    console.log(inpName.value);
    if(inpName.value != ''){
        // colors.style.display='none';
        inpName.style.display='none';
        // hedtext.style.display = 'none';
        textComm.style.display = 'none';
        playNameCont.style.display = 'none';
        colCont.style.display ='none';
        colText.style.display = 'none';
        firstBtn.classList.add('none');
        mainText.classList.remove('none');
        start.classList.remove('none');
        namePlayer.textContent = 'Игрок: ' + inpName.value;
        // violet.classList.add('none');
        results.classList.add('none');


    }else{
        inpName.classList.add('error');
    }
}

inpName.oninput = function(){
    inpName.classList.remove('error');
}
// -------------------------------------------------------------------------------------





// "Продолжить" для первого уровня------------------------------------------------------
function nxt1(){
    if (timerT.textContent == '00:00'){
        nxt();
    }
    let score = localStorage.getItem(inpName.value)
    console.log(score);

    if(score == null){
        localStorage.setItem(inpName.value, count);
    }else {
        if(score<count){
            localStorage.setItem(inpName.value, count);
        }
    }
}
//--------------------------------------------------------------------------------------


// Проверка выполнения уровень 1 -------------------------------------------------------
function ch(){
    let clkWords = document.querySelectorAll('.clk')
    if (taskContainer.textContent == 'Найдите все глаголы'){
        for(let word of clkWords){
            if(verbs.includes(word.dataset.num)){
                word.classList.add('true');
                count+=1;
            }
            else{
                word.classList.add('false');
                count-=1;
            }
        }
    }else if (taskContainer.textContent == 'Найдите все существительные'){
        for(let word of clkWords){
            if(nouns.includes(word.dataset.num)){
                word.classList.add('true');
                count+=1;
            }
            else{
                word.classList.add('false');
                count-=1;
            }
        }
    }else if (taskContainer.textContent == 'Найдите все прилагательные'){
        for(let word of clkWords){
            if(adjectives.includes(word.dataset.num)){
                word.classList.add('true');
                count+=1;
            }
            else{
                word.classList.add('false');
                count-=1;
            }
        }
    }

    let notClkWords = document.querySelectorAll('.word:not(.word.clk)');
    for (let word of notClkWords){
        if (taskContainer.textContent == 'Найдите все глаголы' && verbs.includes(word.dataset.num)){
            word.classList.add('false');
        }else if (taskContainer.textContent == 'Найдите все существительные' && nouns.includes(word.dataset.num)){
            word.classList.add('false');
        }if (taskContainer.textContent == 'Найдите все прилагательные' && adjectives.includes(word.dataset.num)){
            word.classList.add('false');
        }
    }

    

    counter.innerText = 'Счет: ' + count;

    let score = localStorage.getItem(inpName.value)
    if(score == null){
        localStorage.setItem(inpName.value, count);
    }else {
        if(score<count){
            localStorage.setItem(inpName.value, count);
        }
    }


}
// --------------------------------------------------------------------------------------

function nstrt(){
    // if(timerT.textContent == '00:00'){
        let sure = confirm("Игра начнется с первого уровня. Вы уверены, что хотите попробовать пройти игру заново?");
        if(sure === true){
            clearTimeout(tt);
            clearTimeout(ttch);
            strt();

        }

    // }
}
// Запуск уровня 1-----------------------------------------------------------------------
function strt(){

    counter.classList.remove('none');
    timerT.classList.remove('none');
    namePlayer.classList.remove('none');

    mainText.classList.add('none');
    start.style.display = 'none';
    next.classList.remove('none');
    newPlay.classList.remove('none');
    toMain.classList.remove('none');
    again.classList.add('none');
    secondLvl.classList.add('none');


    tasks = ['Найдите все глаголы', 'Найдите все существительные', 'Найдите все прилагательные'];
    words = ['Бегать', 'Варить', 'Набрать', 'Слон', 'Кабачок', 'Танец', 'Книжный','Авторский', 'Тайный' ];
    count = 0;
    counter.innerText = 'Счет: 0' ;

    sec = 0;
    timerT.textContent = '00:00';
    nxt();
}

// ---------------------------------------------------------------------------------------



// Вывод слов и задания уровень 1---------------------------------------------------------
function nxt(){
    let taskNumber = getRandomIndexTask();
    if (tasks.length == 0) {
        taskContainer.textContent = '';
        wordContainer.innerHTML = `<p class = "nextLevelText"> Первый уровень пройден! <br/> Вы набрали  ${count} баллов из 9 возможных.<br/><br/>
        Вы можете пройти первый уровень снова либо перейти на второй уровень. На втором уровне вам предстоит за 10 секунд соотнести предложенные слова с их частями речи.</p>`
        next.classList.add('none');
        newPlay.classList.add('none');

        toMain.classList.remove('none');
        secondLvl.classList.remove('none');
        again.classList.remove('none');
        timerT.textContent = '';

    } else {
        taskContainer.textContent = tasks[taskNumber];
        tasks.splice(taskNumber, 1);
        words = ['Бегать', 'Варить', 'Набрать', 'Слон', 'Кабачок', 'Танец', 'Книжный','Авторский', 'Тайный' ];
        wordContainer.innerHTML='';

        sec = 6;
        timerT.textContent = '00:06';
        timer();
        ttch = setTimeout(ch, 6000);

        while(words.length > 0){
            let wordNumber = getRandomIndexWord();
            wordContainer.innerHTML+=`<p data-obr=0 data-num="${words[wordNumber]}" class="word">${words[wordNumber]}</p>`
            words.splice(wordNumber, 1);
            setWordListener();
        }

    }
}

function setWordListener() {
    let wordContainer = document.querySelectorAll('.word');
    for (let word of wordContainer) {
        word.onclick = wordClick; 
    }
}
function wordClick() {
    if(timerT.textContent!='00:00'){

            // this.classList.add('clk');
            if (this.dataset.obr == 0){
                this.classList.add('clk');
                this.dataset.obr = 1;
            }
            else if (this.dataset.obr == 1){
                this.classList.remove('clk');
                this.dataset.obr = 0;
            }
    }
}

function getRandomIndexTask() {
    return Math.floor(Math.random() * tasks.length);
}

function getRandomIndexWord() {
    return Math.floor(Math.random() * words.length);
}

// -------------------------------------------------------------------------------------------------------




//Cекундомер -----------------------------------
let timerT = document.querySelector('.timer');
let sec = 6;

function sub(){
    sec=sec-1;
}

function tick(){
    sub();
    timerT.textContent = "00:0" + sec;
    if (sec>0){
        timer();
    }
}

function timer(){
   tt = setTimeout(tick, 1000);
}
//____________________________________________________________________________________________________



// __________________________________второй уровень__________________________________________________________

let newPlay2 = document.querySelector('#newPlay2');
newPlay2.onclick = strt2;
let next2 = document.querySelector('#next2');
next2.onclick = nxt22;

function nxt22(){
    if(timerT.textContent=='00:00'){
        nxt2();
    }
}
function strt2(){
    // if(timerT.textContent == '00:00'){
        let sure = confirm("Игра начнется с первого уровня. Вы уверены, что хотите попробовать пройти игру заново?");
        if(sure === true){
            newPlay2.classList.add('none');
            next2.classList.add('none');
            clearTimeout(tt);
            clearTimeout(ttch);
            strt();
        }
    // }
    
}

function getRandomIndexTask2() {
    return Math.floor(Math.random() * tasks2.length);
}

function getRandomIndexPrich() {
    return Math.floor(Math.random() * prichastie.length);
}

function getRandomIndexDeeprich() {
    return Math.floor(Math.random() * deepricastie.length);
}

function getRandomIndexNar() {
    return Math.floor(Math.random() * narechie.length);
}

function nxt2(){
    tasks2 = ['Причастие', 'Деепричастие', 'Наречие'];
    let containerTask2 = document.querySelector('.containerTask2');
    let containerWord2 = document.querySelector('.containerWord2');
    let containerWord3 = document.querySelector('.containerWord3');

    containerTask2.innerHTML = '';
    containerWord2.innerHTML = '';
    containerWord3.innerHTML = '';
    

    console.log(containerWord3.innerHTML);

    createWords2();
    dragDrop();
}

function check2(){
    let words3 = document.querySelectorAll('.word3');
    let w2 = document.querySelectorAll('.word2');
    let containerWord3 = document.querySelector('.containerWord3');
    containerWord3.droppable=false;
    containerWord3.childNodes.innerHTML = '';


    for(let word2 of w2){
        word2.draggable=false;
    }
    
    for (let word3 of words3){

        let w = word3.firstChild;

        if(w==null){
            word3.style.borderColor = 'rgb(255, 89, 89)';
        }else{
            if(word3.dataset.num3 == w.dataset.num2)
            {
                word3.style.borderColor = 'rgb(108, 255, 120)';
                count+=1;
            }else{
                word3.style.borderColor = 'rgb(255, 89, 89)';
                count-=1;
            }
        }

    }

    let score = localStorage.getItem(inpName.value)
    if(score == null){
        localStorage.setItem(inpName.value, count);
    }else {
        if(score<count){
            localStorage.setItem(inpName.value, count);
        }
    }
    counter.innerText = 'Счет: ' + count;
}


function createWords2(){
    let containerTask2 = document.querySelector('.containerTask2');
    let containerWord3 = document.querySelector('.containerWord3');



    let containerWord2 = document.querySelector('.containerWord2');
    if (prichastie.length == 0){
        taskContainer.textContent = '';
        wordContainer.innerHTML = `<p class = "nextLevelText"> Второй уровень пройден! <br/><br/>
        Вы можете пройти игру заново, начиная с первого уровня, либо перейти на третий уровень.<br/> На третьем уровне вам предстоит за 6 секунд найти слова, 
        подходящие под заданное описание.<br/> Удачи!</p>`
        
        // newPlay2.classList.add('none');
        next2.classList.add('none');
        thirdLvl.classList.remove('none');
        again.classList.remove('none');
        newPlay2.classList.add('none');

        timerT.textContent = '';

        
        score = localStorage.getItem(inpName.value)
        // for(let i=0; i<localStorage.length; i++) {
        //     let key = localStorage.key(i);
        //     alert(`${key}: ${localStorage.getItem(key)}`);
        //   }

    }else{
        sec = 10;
        timerT.textContent = '00:10';
        timer();

        let prichNum = getRandomIndexPrich();
        let deeprichNum = getRandomIndexDeeprich();
        let narechieNum = getRandomIndexNar();
        let mas = [1, 2, 3]

       
        // console.log(containerWord3.textContent);

        while(mas.length >0){
            var a = Math.floor(Math.random() * mas.length);
            if (mas[a] == 1){
                containerWord2.innerHTML+=`<p data-num2=1 class="word2" draggable = "true">${prichastie[prichNum]}</p>`
                prichastie.splice(prichNum, 1);
            }else if(mas[a] == 2){
                containerWord2.innerHTML+=`<p data-num2=2 class="word2" draggable = "true">${deepricastie[deeprichNum]}</p>`
                deepricastie.splice(deeprichNum, 1);
            }else if(mas[a]==3){
                containerWord2.innerHTML+=`<p data-num2=3 class="word2" draggable = "true">${narechie[narechieNum]}</p>`
                narechie.splice(narechieNum, 1);
            }

            mas.splice(a, 1);
        }


        
        // containerWord2.innerHTML+=`<p data-num=1 class="word2" draggable = "true">${prichastie[prichNum]}</p>`
        // prichastie.splice(prichNum, 1);

        // containerWord2.innerHTML+=`<p data-num=2 class="word2" draggable = "true">${deepricastie[deeprichNum]}</p>`
        // deepricastie.splice(deeprichNum, 1);

        // containerWord2.innerHTML+=`<p data-num=3 class="word2" draggable = "true">${narechie[narechieNum]}</p>`
        // narechie.splice(narechieNum, 1);
        containerWord3.innerHTML = null;
        while(tasks2.length > 0){
            let task2Number = getRandomIndexTask2();
            containerTask2.innerHTML+=`<p data-num="${task2Number}" class="task2">${tasks2[task2Number]}</p>`
            

            if(tasks2[task2Number] == 'Причастие'){
                containerWord3.innerHTML+=`<p data-num3=1 class="word3"></p>`
            }else if(tasks2[task2Number] == 'Деепричастие'){
                containerWord3.innerHTML+=`<p data-num3=2 class="word3"></p>`
            }else if(tasks2[task2Number] == 'Наречие'){
                containerWord3.innerHTML+=`<p data-num3=3 class="word3"></p>`
            };
            tasks2.splice(task2Number, 1);
        }
        ttch = setTimeout(check2, 10000);
    }
}

function dragDrop(){
    let containerWord2 = document.querySelector('.containerWord2');
    let elements = document.querySelectorAll('.word2');
    let parents = document.querySelectorAll('.word3');
    let current;

    for(word2 of elements){
        // this.ondragstart = function() {
        //     return false;
        // };
        word2.addEventListener('dragstart', function(event){current=this;});
    }

    for(word3 of parents){
        word3.addEventListener('dragenter', function(){this.style.borderColor = 'rgb(193, 200, 201)';});
        word3.addEventListener('dragleave', function(){this.style.borderColor = 'black';});
        word3.addEventListener('dragover', function(event){event.preventDefault();});
        word3.addEventListener('drop', function(event){this.style.borderColor = ''; this.appendChild(current)});
    }

    // containerWord2.addEventListener('dragover', function(event){event.preventDefault();});
    // containerWord2.addEventListener('drop', function(event){this.appendChild(current)});
    
    
}

function toSecondLevel(){
    tasks2 = ['Причастие', 'Деепричастие', 'Наречие'];
    prichastie = ['Колющий', 'Указанный', 'Любящий'];
    deepricastie = ['Слушаясь', 'Управляя', 'Сделав'];
    narechie = ['Смешно', 'Вблизи', 'Напоследок'];
    taskContainer.textContent = 'Соотнесите слова с их частью речи';
    wordContainer.innerHTML = '';
    next.classList.add('none');
    newPlay.classList.add('none');

    next2.classList.remove('none');
    newPlay2.classList.remove('none');
    toMain.classList.remove('none');

    secondLvl.classList.add('none');
    again.classList.add('none');

    wordContainer.innerHTML+=`<p class="containerTask2"></p>`
    wordContainer.innerHTML+=`<p class="containerWord3"></p>`
    wordContainer.innerHTML+=`<p class="containerWord2"></p>`

    createWords2();
    dragDrop();

}



// _______________________________третий уровень________________________________________

let thirdLvl = document.querySelector('#thirdLvl');
thirdLvl.onclick = strt3;

let next3 = document.querySelector('#next3');
next3.onclick = nxt3;

let newPlay3 = document.querySelector('#newPlay3');
newPlay3.onclick = strt13; 

let task3 = ['глаголы', 'существительные', 'прилагательные', 'наречия'];
let letters = ['К', 'П', 'Р', 'С'];

let verbs3 = ['Копаться', 'Кидать', 'Касаться', 'Падать', 'Паять', 'Понимать', 'Рисковать', 'Ропотать', 'Рассказывать', 'Смеяться', 'Смотреть', 'Спорить'];
let nouns3 = ['Кошка', 'Камыш', 'Кино', 'Палатка', 'Пицца', 'Перо', 'Радость', 'Ресурс', 'Род', 'Солнце', 'Сад', 'Сказка'];
let adj3 = ['Каменный', 'Карамельный', 'Круглый', 'Парный', 'Паучий', 'Письменный', 'Рабочий', 'Радужный', 'Ровный', 'Строгий', 'Сонный', 'Сложный'];
let narechie3 = ['Кстати', 'Крепко', 'Кратко', 'Плохо', 'Плавно', 'Поперек', 'Робко', 'Ранее', 'Разом', 'Сложно', 'Сперва', 'Снова'];

function strt13(){
    // if(timerT.textContent == '00:00'){
        let sure = confirm("Игра начнется с первого уровня. Вы уверены, что хотите попробовать пройти игру заново?");
        if(sure === true){
            clearTimeout(tt);
            clearTimeout(ttch);
            newPlay3.classList.add('none');
            next3.classList.add('none');
            strt();
        }
        
    // }
    
}

function getRandomTask3(){
    return Math.floor(Math.random() * task3.length);
}

function getRandomLetter3(){
    return Math.floor(Math.random() * letters.length);
}

// let taskContainer = document.querySelector('.task');
// let wordContainerL = document.querySelector('.wordcontainerLast');

function strt3(){
    next3.classList.remove('none');
    thirdLvl.classList.add('none');
    again.classList.add('none');
    newPlay3.classList.remove('none');
    nxt3();
}


function nxt3(){

    wordContainer.innerHTML = '';

    if(task3.length > 1){
        let task3Num = getRandomTask3();
        let letterNum = getRandomLetter3();

        // taskContainer.innerHTML = `<p data-task="${task3[task3Num]}" data-num="${letters[letterNum]}" class="task"> Найдите все ${task3[task3Num]}, начинающиеся на букву ${letters[letterNum]}</p>`
        // wordContainer.innerHTML+=`<p data-num="${words[wordNumber]}" class="word">${words[wordNumber]}</p>`
        taskContainer.innerHTML = `<p data-task="${task3[task3Num]}" data-let="${letters[letterNum]}" class="task2"> Найдите все ${task3[task3Num]}, начинающиеся на букву ${letters[letterNum]}</p>`
        let task2 = document.querySelector('.task2');
        console.log(task2.dataset.task, task2.dataset.let);


        task3.splice(task3Num, 1);
        letters.splice(letterNum, 1);

        if (task2.dataset.task === 'глаголы' && task2.dataset.let === 'К')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=К data-tn=глаголы class="wordLast">Крутить</p>`
        }else if (task2.dataset.task === 'глаголы' && task2.dataset.let === 'П')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=П data-tn=глаголы class="wordLast">Получать</p>`
        }else if (task2.dataset.task === 'глаголы' && task2.dataset.let === 'Р')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=Р data-tn=глаголы class="wordLast">Радовать</p>`
        }else if (task2.dataset.task === 'глаголы' && task2.dataset.let === 'С')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=С data-tn=глаголы class="wordLast">Слушать</p>`
        }
        
        else if (task2.dataset.task === 'существительные' && task2.dataset.let === 'К')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=К data-tn=существительные class="wordLast">Круг</p>`
        }else if (task2.dataset.task === 'существительные' && task2.dataset.let === 'П')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=П data-tn=существительные class="wordLast">Письмо</p>`
        }else if (task2.dataset.task === 'существительные' && task2.dataset.let === 'Р')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=Р data-tn=существительные class="wordLast">Ручей</p>`
        }else if (task2.dataset.task === 'существительные' && task2.dataset.let === 'С')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=С data-tn=существительные class="wordLast">Собака</p>`
        }
        
        else if (task2.dataset.task === 'прилагательные' && task2.dataset.let === 'К')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=К data-tn=прилагательные class="wordLast">Кривой</p>`
        }else if (task2.dataset.task === 'прилагательные' && task2.dataset.let === 'П')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=П data-tn=прилагательные class="wordLast">Пыльный</p>`
        }else if (task2.dataset.task === 'прилагательные' && task2.dataset.let === 'Р')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=Р data-tn=прилагательные class="wordLast">Редкий</p>`
        }else if (task2.dataset.task === 'прилагательные' && task2.dataset.let === 'С')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=С data-tn=прилагательные class="wordLast">Случайный</p>`
        }

        else if (task2.dataset.task === 'наречия' && task2.dataset.let === 'К')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=К data-tn=наречия class="wordLast">Кругом</p>`
        }else if (task2.dataset.task === 'наречия' && task2.dataset.let === 'П')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=П data-tn=наречия class="wordLast">Подряд</p>`
        }else if (task2.dataset.task === 'наречия' && task2.dataset.let === 'Р')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=Р data-tn=наречия class="wordLast">Радостно</p>`
        }else if (task2.dataset.task === 'наречия' && task2.dataset.let === 'С')
        {
            wordContainer.innerHTML+=`<p data-obr=0 data-n=С data-tn=наречия class="wordLast">Смело</p>`
        }


        for (let i=0; i<8;i++){
            let randomWord;
            let randomArr = Math.floor(Math.random()*4);
            if (randomArr === 0 && verbs3.length>0){
                randomWord = Math.floor(Math.random()*verbs3.length);
                wordContainer.innerHTML+=`<p data-obr=0 data-n=${verbs3[randomWord][0]} data-tn=глаголы class="wordLast">${verbs3[randomWord]}</p>`
                verbs3.splice(randomWord, 1);
            }else if(randomArr === 1 && nouns3.length>0){
                randomWord = Math.floor(Math.random()*nouns3.length);
                wordContainer.innerHTML+=`<p data-obr=0 data-n=${nouns3[randomWord][0]} data-tn=существительные class="wordLast">${nouns3[randomWord]}</p>`
                nouns3.splice(randomWord, 1);
            }else if (randomArr === 2 && adj3.length>0){
                randomWord = Math.floor(Math.random()*adj3.length);
                wordContainer.innerHTML+=`<p data-obr=0 data-n=${adj3[randomWord][0]} data-tn=прилагательные class="wordLast">${adj3[randomWord]}</p>`
                adj3.splice(randomWord, 1);
            }else if (randomArr === 3 && narechie3.length>0){
                randomWord = Math.floor(Math.random()*narechie3.length);
                wordContainer.innerHTML+=`<p data-obr=0 data-n=${narechie3[randomWord][0]} data-tn=наречия class="wordLast">${narechie3[randomWord]}</p>`
                narechie3.splice(randomWord, 1);
            }
            
        }

        console.log(verbs3.length, nouns3.length, adj3.length, narechie3.length);
        setWordListener3();

        let mass3 = new Array(9);

        for (var i = 0; i < mass3.length; i++) {
            mass3[i] = new Array(4);
        }


        let h = wordContainer.clientHeight;
        let w = wordContainer.clientWidth;
        let wls = document.querySelectorAll('.wordLast')
    
        let k = 0; 
        for (let wordLast of wls) 
        {
            let hc = wordLast.clientHeight;
            let wc = wordLast.clientWidth;
            getCoord(h, w, hc, wc);

            if(k>0){
                for(let l=0; l<k;l++){
                    while((x>=(mass3[l][0]-5) && x<=(mass3[l][1]+5) && y>=(mass3[l][2]-5) && y<=(mass3[l][3]+5)) ||
                        (x+wc>=(mass3[l][0]-5) && x+wc<=(mass3[l][1]+5) && y>=(mass3[l][2]-5) && y<=(mass3[l][3]+5)) ||
                        (x>=(mass3[l][0]-5) && x<=(mass3[l][1]+5) && y+hc>=(mass3[l][2]-5) && y+hc<=(mass3[l][3]+5)) ||
                        (x+wc>=(mass3[l][0]-5) && x+wc<=(mass3[l][1]+5) && y+hc>=(mass3[l][2]-5) && y+hc<=(mass3[l][3]+5))){

                        getCoord(h, w, hc, wc);
                        l=0;
                    } 

                    // while((x>=(mass3[l][0]-3) && x<=(mass3[l][1]+3) && y>=(mass3[l][2]-3) && y<=(mass3[l][3])+3) ||
                    //     (x+wc>=mass3[l][0] && x+wc<=mass3[l][1] && y>=mass3[l][2] && y<=mass3[l][3]) ||
                    //     (x>=mass3[l][0] && x<=mass3[l][1] && y+hc>=mass3[l][2] && y+hc<=mass3[l][3]) ||
                    //     (x+wc>=mass3[l][0] && x+wc<=mass3[l][1] && y+hc>=mass3[l][2] && y+hc<=mass3[l][3])){

                    //     getCoord(h, w, hc, wc);
                    //     l=0;
                    // } 

                }
                
            }

            wordLast.style.left = x+"px";
            wordLast.style.top = y+"px";

            mass3[k][0] = x;
            mass3[k][1] = x+wc;
            mass3[k][2] = y;
            mass3[k][3] = y+hc;
            k++;
        }

        sec = 6;
        timerT.textContent = '00:06';
        timer();
        
    
    }else{
        taskContainer.innerHTML = '';
        wordContainer.innerHTML = `<p class = "nextLevelText"> Игра пройдена! <br/> Вы набрали  ${count} баллов.<br/><br/> Поздравляю с успешным завершением игры!</p>`
        wordContainer.innerHTML+= `<div class="kubok"></div>`
        next3.classList.add('none');
        again.classList.remove('none');
        newPlay3.classList.add('none');
    }
    ttch = setTimeout(ch3, 6000);
}

let x;
let y;

function getCoord(h, w, hc, wc){
    x=Math.random()*(w-wc);
    y=Math.random()*(h-hc);

}

// let obratno = new Array(7);


function wordClick3() {
    // if(timerT.textContent!='00:00'){
            if (this.dataset.obr == 0){
                this.classList.add('clk');
                this.dataset.obr = 1;
            }
            else if (this.dataset.obr == 1){
                this.classList.remove('clk');
                this.dataset.obr = 0;
            }

    // }
}

function setWordListener3() {
    let wordsLast = document.querySelectorAll('.wordLast');
    for (let wordLast of wordsLast) {
        wordLast.onclick = wordClick3; 
    }
}

function ch3(){
    let task2 = document.querySelector('.task2');
    let clkLast = document.querySelectorAll('.clk');
    for (let wordLast of clkLast){
        if (wordLast.dataset.n === task2.dataset.let && wordLast.dataset.tn === task2.dataset.task){
            wordLast.classList.add('true');
            count+=1;
        }else{
            wordLast.classList.add('false');
            count-=1;
        }
    }

    let notClkLast = document.querySelectorAll('.wordLast:not(.wordLast.clk)');
    for (let wordLast of notClkLast){
        if(wordLast.dataset.n === task2.dataset.let && wordLast.dataset.tn === task2.dataset.task){
            wordLast.classList.add('false');
        }
    }

    counter.innerText = 'Счет: ' + count;

    let score = localStorage.getItem(inpName.value)
    console.log(score);

    if(score == null){
        localStorage.setItem(inpName.value, count);
    }else {
        if(score<count){
            localStorage.setItem(inpName.value, count);
        }
    }

}





//_______________________________рейтинг___________________________________________

let results = document.querySelector('#results');
results.onclick = res;
function res(){
    // colors.style.display='none';
    // hedtext.classList.add('none');
    // playNameCont.classList.add('none');
    // violet.classList.add('none');
    colCont.style.display ='none';
    colText.style.display = 'none';
    firstBtn.classList.add('none');
    results.classList.add('none');
    inpName.classList.add('none');
    toMain.classList.remove('none');
    wordContainer.style.display = 'none';
    let score = document.querySelector('.score');
    score.classList.remove('none');
    score.innerHTML='Рейтинг игроков <br/><br/>';

    let mass = new Array(localStorage.length);

    for (var i = 0; i < mass.length; i++) {
        mass[i] = new Array(2);
    }

    for(let i=0; i<localStorage.length; i++){
        for(let j=0; j<1; j++){
            mass[i][j] = localStorage.key(i);
            mass[i][j+1] = parseInt(localStorage.getItem(localStorage.key(i)));
        }
        console.log(mass[i][0], mass[i][1]);
    }

    mass.sort((function(index){
        return function(a, b){
            return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
        };
    })(1));

    let c=1;
    for(let i=localStorage.length-1; i>=0; i=i-1){
        console.log(mass[i][0], mass[i][1]);
        if(c<11 && mass[i][0] != 'colorFon'){
            score.innerHTML+=`${c}. ${mass[i][0]} : ${mass[i][1]} <br/>`
            c++;
        }
    }

}

// ______________________________________изменение цвета__________________________________________

let footer = document.querySelector('.footer');
let col1 = document.querySelector('#col1');
col1.onclick = locCol0;

let col2 = document.querySelector('#col2');
col2.onclick = locCol1;

function locCol0(){
    localStorage.setItem('colorFon', 0);
    changeCol();
}
function locCol1(){
    localStorage.setItem('colorFon', 1);
    changeCol();
}

let container = document.querySelector('.container');



changeCol();

function changeCol(){
    let colorNum = localStorage.getItem('colorFon');
    console.log(colorNum);
    if(colorNum == 1){
        color2();
    }else{
        color1();
    }
}



function color1(){
    let buts = document.querySelectorAll('.but');
    let playN = document.querySelectorAll('.playName');
    for (let but of buts){
        but.classList.remove('col2');
    }
    for (let playName of playN){
        playName.classList.remove('col2');
    }
    container.classList.remove('col2');
    main.classList.remove('col2');
    footer.classList.remove('col2');
    start.classList.remove('col2');
    // word.classList.remove('col2');
    counter.classList.remove('col2');
    timerT.classList.remove('col2');
    namePlayer.classList.remove('col2');
    inpName.classList.remove('col2');
}

function color2(){
    let buts = document.querySelectorAll('.but');
    let playN = document.querySelectorAll('.playName');
    for (let but of buts){
        but.classList.add('col2');
    }
    for (let playName of playN){
        playName.classList.add('col2');
    }
    container.classList.add('col2');
    main.classList.add('col2');
    footer.classList.add('col2');
    start.classList.add('col2');
    // word.classList.add('col2');
    counter.classList.add('col2');
    timerT.classList.add('col2');
    namePlayer.classList.add('col2');
    inpName.classList.add('col2');
}





const loadData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const apiData = await res.json();
    const datas = apiData.posts;
    displayData(datas);
}

const loadSearchData = async(searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const apiData = await res.json();
    const datas = apiData.posts;
    displayData(datas);
}

const displayData = (datas) =>{
    const cardContainerDiv = document.getElementById('card-container');
    cardContainerDiv.textContent = '';
    datas.forEach(data => {
        const div = document.createElement('div');
        div.classList = `flex flex-col lg:flex-row items-center gap-6 bg-[#F3F3F5] rounded-3xl lg:p-10 p-3`;
        div.innerHTML = `
        <div class="relative size-[72px]">
                <img
                  class="rounded-2xl"
                  src="${data.image}"
                  alt=""
                />
                <div
                  class=" ${data.isActive ? 'bg-[#10B981]' : 'bg-[#FF3434]'} size-[17px] absolute top-[-3px] right-[-3px] border-2 border-white rounded-full"
                ></div>
              </div>
              <div class="flex grow flex-col gap-4">
                <div class="flex gap-3">
                  <p>#${data.category}</p>
                  <p>Author: ${data.author.name}</p>
                </div>
                <h3 id="data-title${data.id}" class="text-xl font-bold">
                  ${data.title}
                </h3>
                <p>
                  ${data.description}
                </p>
                <hr class="border border-dashed opacity-90" />
                <div class="flex justify-between">
                  <div class="flex gap-5">
                    <div class="flex gap-1">
                      <img src="images/tabler-icon-message-2.svg" alt="" />
                      <p>${data.comment_count}</p>
                    </div>
                    <div class="flex gap-1">
                      <img src="images/tabler-icon-eye.svg" alt="" />
                      <p id="data-view-count${data.id}">${data.view_count}</p>
                    </div>
                    <div class="flex gap-1">
                      <img src="images/tabler-icon-clock-hour-9.svg" alt="" />
                      <p>${data.posted_time} min</p>
                    </div>
                  </div>
                  <button onclick="markAsRead('${data.id}')"><img src="images/email 1.svg" alt="" /></button>
                </div>
              </div>
        `;
        cardContainerDiv.appendChild(div);
            spinner(false);
    });
}


let countMarkAsRead = 0;
const markAsRead = (id) =>{
    countMarkAsRead++;
    const count = document.getElementById('count');
    count.innerText = countMarkAsRead;
    const titleDiv = document.getElementById(`data-title${id}`);
    const title = titleDiv.innerText;
    const viewDiv = document.getElementById(`data-view-count${id}`);
    const view = viewDiv.innerText;
    const markAsDivContainer = document.getElementById('mark-as-div-container')
    const div = document.createElement('div');
        div.classList = `flex items-center bg-white p-3 rounded-2xl`;
        div.innerHTML = `
        <h3 class="font-semibold">
                  ${title}
                </h3>
                <img src="images/tabler-icon-eye.svg" alt="" />
                <p>${view}</p>
        `;
        markAsDivContainer.appendChild(div);
}

const spinner = (params) =>{
    const spinnerDiv = document.getElementById('spinner');
    const spinnerDiv2 = document.getElementById('spinner2');
    if(params){
        spinnerDiv.classList.remove('hidden');
        spinnerDiv2.classList.remove('hidden');
    }
    else{
        spinnerDiv.classList.add('hidden');
        spinnerDiv2.classList.add('hidden');
    }
}
spinner(true);

const searchFunction = () =>{
    spinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    setTimeout(function() {
        loadSearchData(searchText);
    }, 1000);
}

setTimeout(function() {
    loadData();
}, 1000);
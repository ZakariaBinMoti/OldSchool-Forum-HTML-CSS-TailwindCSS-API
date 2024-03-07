const loadLatestPostData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const apiData = await res.json();
    displayLatestPostData(apiData);
}

const displayLatestPostData = (datas) =>{
    const cardContainerDiv = document.getElementById('latestPost-card-container');
    cardContainerDiv.textContent = '';
    datas.forEach(data => {
        const div = document.createElement('div');
        div.classList = `p-6 border border-gray-200 rounded-3xl space-y-4`;
        div.innerHTML = `
        <img
              class="rounded-2xl"
              src="${data.cover_image}"
              alt=""
            />
            <div class="flex gap-1">
              <img src="images/date.svg" alt="" />
              <p>${data.author?.posted_date !=null ? data.author.posted_date : "No Publish Date"}</p>
            </div>
            <h3 class="font-extrabold">
            ${data.title}
            </h3>
            <p>
            ${data.description}
            </p>
            <div class="flex items-center gap-3">
              <img
                class="size-11 rounded-full"
                src="${data.profile_image}"
                alt=""
              />
              <div>
                <h3 class="font-bold">${data.author.name}</h3>
                <p>${data.author?.designation != null ? data.author.designation : "Unknown"}</p>
              </div>
            </div>
        `;
        cardContainerDiv.appendChild(div);
    });
}
setTimeout(function() {
    loadLatestPostData();
}, 1000);
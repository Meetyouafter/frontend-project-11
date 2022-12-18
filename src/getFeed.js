const parser = new DOMParser();

const getFeed = (url) => {
  fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } 
      const bodyEl = document.querySelector('.body');
      const h1El = document.createElement('h1');
      h1El.innerText = "Что-то пошло не так"
      bodyEl.prepend(h1El)
      throw new Error('Network response was not ok.')
    })
    .then(data => parser.parseFromString(data.contents, 'text/html'))
    .then(content => {
      const title = content.querySelectorAll('title');
      const description = content.querySelectorAll('description');
      const bodyEl = document.querySelector('.body');
  
      const titleArray = Array.from(title);
      const descriptionArray = Array.from(description);
  
      const feeds = [];
  
      for (let i = 0; i < titleArray.length; i++) {
        feeds[i] = {
          title: titleArray[i],
          description: descriptionArray[i],
          index: i,
        }
      }

    console.log(feeds)

    return feeds.map((feed) => {
      console.log(feed)
      const divEl = document.createElement('div');
      divEl.classList.add('content');

      const h1El = document.createElement('h1');
      const pEl = document.createElement('p');

      h1El.innerHTML = feed.title.innerHTML;
      pEl.innerHTML = feed.description.innerHTML;

      divEl.prepend(h1El)
      divEl.append(pEl)

      bodyEl.prepend(divEl)

    })
    .catch = (error) => {
      console.log('errrrrrrr', error)
    }
  })
}

export default getFeed

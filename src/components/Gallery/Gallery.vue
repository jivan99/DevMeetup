<template>
  <section class="gallery">
    <div class="container">
      <div class="img-container">
        <figure>
          <img src="./images/meetup1.jpg" />
        </figure>
      </div>
      <div class="img-container">
        <figure>
          <img src="./images/meetup2.jpg" />
        </figure>
      </div>
      <div class="img-container">
        <figure>
          <img src="./images/meetup3.jpg" />
        </figure>
      </div>
      <div class="img-container">
        <figure>
          <img src="./images/meetup4.jpg" />
        </figure>
      </div>
      <div class="img-container">
        <figure>
          <img src="./images/meetup5.jpg" />
        </figure>
      </div>
      <div class="img-container">
        <figure>
          <img src="./images/meetup6.jpg" />
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-gap: 1rem;
}

section div.container .img-container {
  width: 100%;
}

section div.container figure {
  overflow: hidden;
  background: black;
  height: 100%;
}

section div.container img {
  width: 100%;
  height: 100%;
  transform: scale(1.3);
  opacity: 0.5;
  transition: all 0.4s ease-out;
}

section div.container img:hover {
  transform: scale(1.05);
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  .gallery {
    max-width: 500px;
    margin: 0 auto;
  }

  .container {
    display: block;
  }

  section div.container .img-container {
    margin-bottom: 1rem;
  }
}
</style>



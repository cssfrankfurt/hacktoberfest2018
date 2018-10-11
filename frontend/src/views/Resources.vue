<template>
  <div class="page">
    <div class="content white--text">
      <h1 class="white--text">Resources</h1>
      <p>Find out how you can get the most out of Hacktoberfest 2018</p>
      <h3 class="white--text">How to contribute to Open Source</h3>
      Contributing to Open Source isn't magic. In fact, it's quite easy once you find the right project and know how to use GitHub.
      In case you need a guide, there is an excellent one by GitHub themselves!
      <a 
        class="featured white--text" 
        href="https://opensource.guide/how-to-contribute/">https://opensource.guide/how-to-contribute/</a>
      <br>
      <br>
      <h3 class="white--text">Projects to contribute to</h3>
      If it's your first contribution, check out an awesome <a 
        class="white--text" 
        href="https://github.com/MunGell/awesome-for-beginners">list of beginner-friendly projects</a>!
      <blockquote>
        <p>
          In general, any GitHub issue labeled with <i>hacktoberfest</i> is intended for Hacktoberfest Contributions.
          You can find all of them <a 
            class="white--text" 
            href="https://github.com/search?q=label:hacktoberfest+state:open+type:issue">here</a>!
          There is also a <i>Languages</i> pane on the left to filter for specific programming languages.
        </p>
      </blockquote>
      <blockquote>
        <p>
          This year, <a 
            class="white--text" 
            href="https://open.microsoft.com/2018/09/18/hacktoberfest-2018-microsoft/">Microsoft joined Hacktoberfest</a>.
            Everyone who submits a Pull Request to one of their repositories will earn an extra T-Shirt!
            Go check out Microsoft's Open Source repositories <a 
              class="white--text" 
              href="https://opensource.microsoft.com/">here</a>. 
        </p>
      </blockquote>
      <h4 class="white--text">Here are some of our picks:</h4>
      <ul class="projectlist">
        <li 
          v-for="project in projects" 
          :key="project.index">
          <a 
            :href="'https://github.com' + project.title" 
            class="white--text">{{ project.title }}</a>
          <p :class="{ 'featured': (project.featured)}">{{ project.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Resources",
  data: () => ({
    projects: [
      {
        featured: true,
        title: "cssfrankfurt/hacktoberfest2018",
        description: "The Hacktoberfest Frankfurt Website!"
      },
      {
        title: "freeCodeCamp/guide",
        description: "A collection of guides to programming"
      },
      {
        title: "30-seconds/30-seconds-of-code",
        description:
          "Curated collection of useful JavaScript snippets that you can understand in 30 seconds or less"
      },
      {
        title: "30-seconds/30-seconds-of-react",
        description:
          "Curated collection of useful React snippets that you can understand in 30 seconds or less"
      },
      {
        title: "matthewsamuel95/ACM-ICPC-Algorithms",
        description: "Multi-lingual algorithms for competitive programming"
      },
      {
        title: "30-seconds/30-seconds-of-css",
        description:
          "Curated collection of useful CSS snippets that you can understand in 30 seconds or less"
      },
      {
        title: "30-seconds/30-seconds-of-interviews",
        description:
          "Common interview questions to help you prepare for your next interview"
      }
    ]
  })
};
</script>

<style lang="sass">
.white--text
  color: white

blockquote
  border-left: 10px solid $color-secondary
  margin: 1.5em 10px
  padding: 0.5em 10px

blockquote:before
  color: #ccc
  font-size: 4em
  line-height: 0.1em
  margin-right: 0.25em
  vertical-align: -0.4em

blockquote p
  display: inline

.featured
  font-weight: bold

.content
  max-width: 800px
  font-size: 18px
  margin: auto

.projectlist
  margin-top: 10px

ul
  list-style: none
  padding-left: 10px
</style>
